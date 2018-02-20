package umm3601.todo;

import com.google.gson.Gson;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class TodoController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> todoCollection;

    public TodoController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        todoCollection = database.getCollection("todos");
    }

    public String getTodo(String id) {
        FindIterable<Document> jsonUsers
            = todoCollection
            .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonUsers.iterator();
        if (iterator.hasNext()) {
            Document user = iterator.next();
            return user.toJson();
        } else {
            // We didn't find the desired todo
            return null;
        }
    }

    public String getTodos(Map<String, String[]> queryParams)  {
        Document filterDoc = new Document();

        if (queryParams.containsKey("owner")) {
            String targetOwner = queryParams.get("owner")[0];
            filterDoc = filterDoc.append("owner", targetOwner);
        }

        //FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingUsers = todoCollection.find(filterDoc);

        return JSON.serialize(matchingUsers);
    }
}
