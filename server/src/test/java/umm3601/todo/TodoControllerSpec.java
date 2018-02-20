package umm3601.todo;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

public class TodoControllerSpec {
    private TodoController todoController;
    private ObjectId johnId;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> userDocuments = db.getCollection("todos");
        userDocuments.drop();
        List<Document> testTodos = new ArrayList<>();
        testTodos.add(Document.parse("{\n" +
            "                    owner: \"Nic\",\n" +
            "                    status: true,\n" +
            "                    body: \"it snowed today and its tuesday\",\n" +
            "                    category: \"weather\"\n" +
            "                }"));
        testTodos.add(Document.parse("{\n" +
            "                    owner: \"Matt\",\n" +
            "                    status: false,\n" +
            "                    body: \"read chapter 12\",\n" +
            "                    category: \"homework\"\n" +
            "                }"));
        testTodos.add(Document.parse("{\n" +
            "                    owner: \"Jamie\",\n" +
            "                    status: true,\n" +
            "                    body: \"eat breakfast this morning\",\n" +
            "                    category: \"food\"\n" +
            "                }"));

        johnId = new ObjectId();
        BasicDBObject sam = new BasicDBObject("_id", johnId);
        sam = sam.append("owner", "John")
            .append("status", false)
            .append("body", "take out the trash")
            .append("category", "chores");



        userDocuments.insertMany(testTodos);
        userDocuments.insertOne(Document.parse(sam.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.

        todoController = new TodoController(db);
    }

    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    private static String getOwner(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("owner")).getValue();
    }


    @Test
    public void getAllUsers() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = todoController.getTodos(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 users", 4, docs.size());
        List<String> names = docs
            .stream()
            .map(TodoControllerSpec::getOwner)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedOwners = Arrays.asList("Jamie", "John", "Matt", "Nic");
        assertEquals("Owners should match", expectedOwners, names);
    }
/*
    @Test
    public void getUsersWhoAre37() {
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("age", new String[] { "37" });
        String jsonResult = todoController.getUsers(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 2 users", 2, docs.size());
        List<String> names = docs
            .stream()
            .map(TodoControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Jamie", "Pat");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getSamById() {
        String jsonResult = todoController.getUser(samsId.toHexString());
        Document sam = Document.parse(jsonResult);
        assertEquals("Name should match", "Sam", sam.get("name"));
        String noJsonResult = todoController.getUser(new ObjectId().toString());
        assertNull("No name should match",noJsonResult);

    }

    @Test
    public void addUserTest(){
        boolean bool = todoController.addNewUser("Brian",22,"umm", "brian@yahoo.com");

        assertTrue("Add new user should return true when user is added,",bool);
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("age", new String[] { "22" });
        String jsonResult = todoController.getUsers(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        List<String> name = docs
            .stream()
            .map(TodoControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        assertEquals("Should return name of new user", "Brian", name.get(0));
    }

    @Test
    public void getUserByCompany(){
        Map<String, String[]> argMap = new HashMap<>();
        //Mongo in TodoController is doing a regex search so can just take a Java Reg. Expression
        //This will search the company starting with an I or an F
        argMap.put("company", new String[] { "[I,F]" });
        String jsonResult = todoController.getUsers(argMap);
        BsonArray docs = parseJsonArray(jsonResult);
        assertEquals("Should be 3 users", 3, docs.size());
        List<String> name = docs
            .stream()
            .map(TodoControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedName = Arrays.asList("Jamie","Pat","Sam");
        assertEquals("Names should match", expectedName, name);

    }

*/

}
