import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class TodoPage {
    navigateTo(): promise.Promise<any> {
        return browser.get('/todos');
    }

    // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getTodoTitle() {
        const title = element(by.id('todo-list-title')).getText();
        this.highlightElement(by.id('todo-list-title'));

        return title;
    }

    typeABody(body: string) {
        const input = element(by.id('todoBody'));
        input.click();
        input.sendKeys(body);
    }

    typeAnOwner(owner: string) {
        const input = element(by.id('todoOwner'));
        input.click();
        input.sendKeys(owner);
        const selectButton = element(by.id('submitOwner'));
        selectButton.click();
    }

    clearOwnerField() {
        const clearButton = element(by.id('ownerClearSearch'));
        clearButton.click();
    }

    clearBodyField() {
        const input = element(by.id('bodyClearSearch'));
        input.click();
    }

    selectCompleteStatus() {
        const input = element(by.id('complete'))
        input.click();
    }

    selectIncompleteStatus() {
        const input = element(by.id('incomplete'))
        input.click();
    }

    selectAllStatuses() {
        const input = element(by.id('allStatus'))
        input.click();
    }

    selectUpKey() {
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    backspace() {
        browser.actions().sendKeys(Key.BACK_SPACE).perform();
    }


    getCategory(category: string) {
        const input = element(by.id('todoCategory'));
        input.click();
        input.sendKeys(category);
        const selectButton = element(by.id('submit'));
        selectButton.click();
    }

    getUniqueTodo(anID: string) {
        const todo = element(by.id(anID)).getText();
        this.highlightElement(by.id(anID));

        return todo;
    }

    getTodos() {
        return element.all(by.className('todos'));
    }

    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('addNewTodo'));
        return element(by.id('addNewTodo')).isPresent();
    }

    clickAddTodoButton(): promise.Promise<void> {
        this.highlightElement(by.id('addNewTodo'));
        return element(by.id('addNewTodo')).click();
    }

}
