const express = require('express');
const app = express();
const fs = require('fs');


app.get('/todos', (req, res) => {
    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send("Data not found");
        }

        // Parse and send the data
        try {
            const todos = JSON.parse(data);
            res.status(200).json(todos);
        } catch (parseErr) {
            res.status(500).send("Error parsing JSON data");
        }
    });
});

app.put('/todos/:id/complete', (req, res) => {
    let id = req.params.id;

    //Index Find Function
    const findtoDobyId = (todos, id) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                return i;
            }

            else {
                return -1;
            }

        }
    }

    fs.readFile('./store/todos.json', 'utf-8', (er, data) => {
        if (er) {
            return res.status(404).send("Data not found");
        }

        // Parse and send the data
        try {
            const todos = JSON.parse(data);
            const todoIndex = findtoDobyId(todos, id);
            console.log("Todo Index ID", todoIndex)
            if (todoIndex === -1) return res.status(500).send("Something Went Wrong");

            return res.json(todos[todoIndex])
        } catch (parseErr) {
            res.status(500).send("Error parsing JSON data");
        }
    })
})

// Ensure the server is listening on a specific port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
