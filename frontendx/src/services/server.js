const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const cors = require("cors")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"))

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/audio/"
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true)
    } else {
      cb(new Error("Only audio files are allowed!"), false)
    }
  },
})

// Test endpoint to check if server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" })
})

// Upload endpoint
app.post("/api/upload", upload.array("audioFiles"), (req, res) => {
  console.log("Upload request received")
  console.log("Body:", req.body)
  console.log("Files:", req.files)

  try {
    const { title, artist, album, genre, description } = req.body

    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "Title and artist are required",
      })
    }

    const files = req.files

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      })
    }

    // Here you would save to your MongoDB database
    const trackData = {
      title,
      artist,
      album: album || "",
      genre: genre || "",
      description: description || "",
      audioFiles: files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
      })),
      uploadDate: new Date(),
    }

    // Save to database (replace with your MongoDB logic)
    console.log("Track data to save:", trackData)

    res.json({
      success: true,
      message: "Track uploaded successfully!",
      trackId: "track-" + Date.now(),
      data: trackData,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({
      success: false,
      message: "Upload failed: " + error.message,
    })
  }
})

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 50MB.",
      })
    }
  }

  res.status(500).json({
    success: false,
    message: error.message,
  })
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
