/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  coverBg: string;
  iconName: string; // Lucide icon identifier e.g. "Heart", "Cloud", "BookOpen", "DoorOpen", "Lightbulb"
  brief: string;
  pages: string[];
}

export interface TimelineEra {
  year: string;
  subtitle: string;
  heading: string;
  image: string;
  paragraphs: string[];
}

export interface HealingQuote {
  text: string;
  source: string;
}
