import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import {
  addDemoTask,
  getDemoTasks,
  updateDemoTask,
  deleteDemoTask,
} from "../services/firestoreDemo";

const FirestoreDemoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getDemoTasks();
      if (res.ok) setTasks(res.data);
    } catch (e) {
      console.error("load tasks error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const res = await addDemoTask(text.trim());
    if (res.ok) {
      setText("");
      await load();
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Firestore Demo
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <TextInput
          placeholder="New task"
          value={text}
          onChangeText={setText}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 4,
            marginRight: 8,
          }}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <View style={{ marginBottom: 8 }}>
        <Button title="Refresh" onPress={load} disabled={loading} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={() => (
          <Text style={{ color: "#666" }}>
            {loading ? "Loading..." : "No tasks"}
          </Text>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#eee",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>
              {item.text} {item.done ? "(done)" : ""}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                title={item.done ? "Undo" : "Done"}
                onPress={async () => {
                  await updateDemoTask(item.id, { done: !item.done });
                  await load();
                }}
              />
              <View style={{ width: 8 }} />
              <Button
                title="Delete"
                color="#c00"
                onPress={async () => {
                  await deleteDemoTask(item.id);
                  await load();
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FirestoreDemoScreen;
