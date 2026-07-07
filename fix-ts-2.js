import fs from 'fs';
import path from 'path';

const replaceInFile = (filePath, searchValue, replaceValue) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(searchValue, replaceValue);
    fs.writeFileSync(filePath, content);
  }
}

// Fix Testimonials.tsx missing AnimatePresence
replaceInFile(
  'src/components/sections/Testimonials.tsx',
  "import { motion } from 'framer-motion';",
  "import { motion, AnimatePresence } from 'framer-motion';"
);

// Fix Button.tsx type ReactNode
replaceInFile(
  'src/components/ui/Button.tsx',
  "import { forwardRef, ReactNode } from 'react';",
  "import { forwardRef } from 'react';\nimport type { ReactNode } from 'react';"
);

// Fix GlassCard.tsx type ReactNode
replaceInFile(
  'src/components/ui/GlassCard.tsx',
  "import { ReactNode } from 'react';",
  "import type { ReactNode } from 'react';"
);

console.log('Fixed second batch of TS errors');
