import {TodoPage} from './todo-list.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

const origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
    browser.driver.controlFlow().execute = function () {
        let args = arguments;
    //queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its thing.
    //If you're tired of it taking long you can remove this call
        origFn.call(browser.driver.controlFlow(), function () {
            return protractor.promise.delayed(1);
        });

        return origFn.apply(browser.driver.controlFlow(), args);
    };

describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todos title attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('should type something in search for owner text box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner('fr');
        expect(page.getUniqueTodo('58af3a600343927e48e87217')).toEqual('highlight_off\n' +
            '  Fry');
        page.clearOwnerField();
        page.typeAnOwner('bla');
        expect(page.getUniqueTodo('58af3a600343927e48e8720f')).toEqual('highlight_off\n' +
            '  Blanche');
    });

    it('should type something in filter body text box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeABody('magna elit in culpa veniam');
        expect(page.getUniqueTodo('58af3a600343927e48e8722c')).toEqual('highlight_off\n' +
            '  Fry');
        page.clearBodyField();
        page.typeABody('eu id occaecat mollit consectetur');
        expect(page.getUniqueTodo('58af3a600343927e48e8731d')).toEqual('check_circle\n' +
            '  Barry');
    });

    it('should select filter by status: \'complete\' radio button and check that complete status is returned', () => {
        page.navigateTo();
        page.chooseCompleteStatus();
        expect(page.getUniqueTodo('58af3a600343927e48e87212')).toEqual('check_circle\n' +
            '  Blanche');
    })

    it('should select filter by status: \'incomplete\' radio button and check that complete status is returned', () => {
        page.navigateTo();
        page.chooseIncompleteStatus();
        expect(page.getUniqueTodo('58af3a600343927e48e8720f')).toEqual('highlight_off\n' +
            '  Blanche');
    })

    it('should select filter by status: \'all\' radio button and check that complete status is returned', () => {
        page.navigateTo();
        page.chooseAllStatuses();
        page.typeAnOwner('bar');
        page.typeABody('Nisi sunt aliqua');
        expect(page.getUniqueTodo('58af3a600343927e48e872bc')).toEqual('check_circle\n' +
            '  Barry');
    })

    it('should select the groceries category and check that correct element is returned', () => {
        page.navigateTo();
        page.chooseGroceries();
        expect(page.getUniqueTodo('58af3a600343927e48e8721e')).toEqual('check_circle\n' +
            '  Blanche');
    })

    it('should select the homework category and check that correct element is returned', () => {
        page.navigateTo();
        page.chooseHomework();
        expect(page.getUniqueTodo('58af3a600343927e48e87219')).toEqual('highlight_off\n' +
            '  Workman');
    })

    it('should select the software design category and check that correct element is returned', () => {
        page.navigateTo();
        page.chooseSoftwareDesign();
        expect(page.getUniqueTodo('58af3a600343927e48e8720f')).toEqual('highlight_off\n' +
            '  Blanche');
    })

    it('should select the video games category and check that correct element is returned', () => {
        page.navigateTo();
        page.chooseVideoGames();
        expect(page.getUniqueTodo('58af3a600343927e48e87214')).toEqual('check_circle\n' +
            '  Barry');
    })

    it('should specify something in all four fields and return correct element for Roberta', () => {
        page.navigateTo();
        page.typeAnOwner('rob');
        page.typeABody('ex nostrud');
        page.chooseIncompleteStatus();
        page.chooseGroceries();
        expect(page.getUniqueTodo('58af3a600343927e48e8723c')).toEqual('highlight_off\n' +
            '  Roberta');
    })

    it('should specify something in all four fields and return correct element for Dawn', () => {
        page.navigateTo();
        page.typeAnOwner('dawn');
        page.typeABody('culpa');
        page.chooseCompleteStatus();
        page.chooseGroceries();
        expect(page.getUniqueTodo('58af3a600343927e48e87327')).toEqual('check_circle\n' +
            '  Dawn');
    })

    it('Should have an add todo button', () => {
        page.navigateTo();
        expect(page.buttonExists()).toBeTruthy();
    });

    it('Should open a dialog box when add todo button is clicked', () => {
        page.navigateTo();
        expect(element(by.css('add-todo')).isPresent()).toBeFalsy('There should not be a modal window yet');
        element(by.id('addNewTodo')).click();
        expect(element(by.css('add-todo')).isPresent()).toBeTruthy('There should be a modal window now');
    });

    it('Should actually add the todo with the information we put in the fields', () => {
        page.navigateTo();
        page.clickAddTodoButton();
        element(by.id('ownerField')).sendKeys('Kyle DeBates');
        element(by.id('bodyField')).sendKeys('I never show up to classes!');
        page.chooseHomeworkCategoryInDialog();
        page.chooseCompleteInDialog();
        page.actuallyAddTodo();
    });

    it('Should allow us to put information into the fields of the add todo dialog', () => {
        page.navigateTo();
        page.clickAddTodoButton();
        expect(element(by.id('ownerField')).isPresent()).toBeTruthy('There should be an owner field');
        element(by.id('ownerField')).sendKeys('Avery Koranda');
        expect(element(by.id('bodyField')).isPresent()).toBeTruthy('There should be a body field');
        element(by.id('bodyField')).sendKeys('I go to every class that I can.');
        expect(element(by.id('statusField')).isPresent()).toBeTruthy('There should be a status field');
        page.chooseCompleteInDialog();
        expect(element(by.id('dialogCategory')).isPresent()).toBeTruthy('There should be a category field');
        page.chooseHomeworkCategoryInDialog();
        element(by.id('exitWithoutAddingButton')).click();
    });

});
