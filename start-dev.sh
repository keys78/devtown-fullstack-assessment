#!/bin/bash
cd frontend
yarn dev &
cd ../backend
npm run dev
