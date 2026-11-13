import { archiveExtensions, documentExtension } from '@/lib/document-formats';
const pdf = { url: '/__l5e/assets-v1/0a3a63cb-6aee-4800-a35c-5a2c75cced66/e3f2c139-pdf.webp' };
const word = { url: '/__l5e/assets-v1/89b9416d-7bfd-4d01-ba22-423e6785e2d2/cd164d7b-word.webp' };
const excel = { url: '/__l5e/assets-v1/49593a8c-a8d6-40db-ab1c-e4c70a9248bc/76c3c917-excel.webp' };
const powerpoint = { url: '/__l5e/assets-v1/c5f15ac2-b117-43ba-b524-d71e4e651b89/995dbb07-powerpoint.webp' };
const archive = { url: '/__l5e/assets-v1/f12e5b2a-cc50-4faf-a076-90ba5411eda0/e3e38388-archive.webp' };
const rtf = { url: '/__l5e/assets-v1/cd0be11e-5974-45cf-852f-4be7adc235db/03dc7ab4-rtf.png' };
const txt = { url: '/__l5e/assets-v1/6c148b43-5583-4c84-9d40-d56cc0e43476/cd7794b8-txt.webp' };

const placeholders = { pdf, word, excel, powerpoint, archive, rtf, txt };

export function documentPlaceholder(url: string) {
  const extension = documentExtension(url);
  if (extension === 'pdf') return placeholders.pdf;
  if (['doc', 'docx'].includes(extension)) return placeholders.word;
  if (['xls', 'xlsx'].includes(extension)) return placeholders.excel;
  if (['ppt', 'pptx', 'pps', 'ppsx'].includes(extension)) return placeholders.powerpoint;
  if (extension === 'rtf') return placeholders.rtf;
  if (extension === 'txt') return placeholders.txt;
  if (archiveExtensions.includes(extension)) return placeholders.archive;
  return null;
}
