import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import fs from "fs";
import { getNewsletters } from "./routes/newsletters";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to serve images directly with proper headers
  app.get('/api/assets/:filename', (req, res) => {
    try {
      const filename = decodeURIComponent(req.params.filename);
      const fullPath = path.join(process.cwd(), 'attached_assets', filename);

      if (!fs.existsSync(fullPath)) {
        return res.status(404).send('File not found');
      }

      // Set proper content type
      if (filename.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      }

      // Send file directly
      res.sendFile(fullPath);
    } catch (error) {
      res.status(500).send('Error serving file');
    }
  });

  // VibeTube API - fetch and classify videos from newsletters
  app.get('/api/newsletters', getNewsletters);

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
