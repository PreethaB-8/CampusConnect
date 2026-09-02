const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory notice storage
const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination",
    description: "Mid-semester examinations begin from October 10.",
    category: "Examination",
    priority: "High",
    date: new Date().toISOString()
  },
  {
    id: 2,
    title: "Campus Cultural Fest",
    description: "Annual cultural fest registrations are now open.",
    category: "Events",
    priority: "Normal",
    date: new Date().toISOString()
  }
];

let nextId = 3;

// Home endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusConnect Digital Notice Board"
  });
});

// Health endpoint for Kubernetes probes
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

// Create a new notice
app.post("/notices", (req, res) => {
  const { title, description, category, priority } = req.body;

  const validCategories = [
    "Academic",
    "Examination",
    "Events",
    "General"
  ];

  const validPriorities = [
    "Low",
    "Normal",
    "High",
    "Urgent"
  ];

  if (!title || !description || !category || !priority) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: "Invalid category"
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      error: "Invalid priority"
    });
  }

  const newNotice = {
    id: nextId++,
    title,
    description,
    category,
    priority,
    date: new Date().toISOString()
  };

  notices.push(newNotice);

  res.status(201).json(newNotice);
});

// View all notices with optional filtering
app.get("/notices", (req, res) => {
  const { category, priority } = req.query;

  let filteredNotices = notices;

  if (category) {
    filteredNotices = filteredNotices.filter(
      notice => notice.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (priority) {
    filteredNotices = filteredNotices.filter(
      notice => notice.priority.toLowerCase() === priority.toLowerCase()
    );
  }

  res.json(filteredNotices);
});

// View a specific notice
app.get("/notices/:id", (req, res) => {
  const id = Number(req.params.id);

  const notice = notices.find(notice => notice.id === id);

  if (!notice) {
    return res.status(404).json({
      error: "Notice not found"
    });
  }

  res.json(notice);
});

app.listen(PORT, () => {
  console.log(`CampusConnect server running on port ${PORT}`);
});

module.exports = app;