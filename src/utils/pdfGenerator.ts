import { jsPDF } from "jspdf";
import { bookIntro, modules, conclusions, bonusContent } from "../data/ebookContent";

// Helper function to sanitize text by removing or replacing emojis/unsupported Unicode symbols
function sanitizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/⚠/g, "ATENCAO:")
    .replace(/💡/g, "DICA:")
    .replace(/✅/g, "SIM")
    .replace(/❌/g, "NAO")
    .replace(/🛋️/g, "[SOFA]")
    .replace(/🛡️/g, "[SEGURANCA]")
    .replace(/🚿/g, "[LIMPEZA]")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/•/g, "-")
    .replace(/Ø=Ü¡/g, "DICA:")
    .replace(/ø/g, "o")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .trim();
}

// Custom table-drawing function with auto-wrapping, zebra striping, and clean borders
function drawTable(
  doc: jsPDF,
  headers: string[],
  rows: string[][],
  colWidths: number[],
  startX: number,
  startY: number,
  currentModuleTitle: string,
  checkPageOverflow: (neededHeight: number, title?: string) => void,
  addHeaderFooter: (pageNumber: number, title?: string) => void
): number {
  let currentY = startY;

  // Set font settings for headers to measure their sizes accurately
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);

  // Wrap header cells to fit inside their column widths (minus 3mm padding)
  const wrappedHeaders = headers.map((header, colIdx) => {
    const cleanHeader = sanitizeText(header);
    return doc.splitTextToSize(cleanHeader, colWidths[colIdx] - 3);
  });

  // Calculate header row height based on the maximum number of lines
  const maxHeaderLineCount = Math.max(...wrappedHeaders.map(lines => lines.length));
  const headerHeight = maxHeaderLineCount * 4 + 4; // 4mm per line + padding

  // Draw table header row
  checkPageOverflow(headerHeight + 4, currentModuleTitle);
  doc.setFillColor(16, 84, 227); // Deep Blue Header
  doc.rect(startX, currentY, colWidths.reduce((a, b) => a + b, 0), headerHeight, "F");
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  
  let headerX = startX;
  wrappedHeaders.forEach((lines, idx) => {
    lines.forEach((line: string, lineIdx: number) => {
      // Draw header line centered vertically or spaced sequentially
      doc.text(line, headerX + 1.5, currentY + 4 + (lineIdx * 3.6));
    });
    headerX += colWidths[idx];
  });
  
  currentY += headerHeight;

  // Draw body rows
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);

  rows.forEach((row, rowIndex) => {
    // Wrap each cell's text to fit inside its column width
    const wrappedCells = row.map((cell, colIdx) => {
      const cleanCell = sanitizeText(cell);
      return doc.splitTextToSize(cleanCell, colWidths[colIdx] - 3);
    });

    const maxLineCount = Math.max(...wrappedCells.map(cellLines => cellLines.length));
    const rowHeight = maxLineCount * 3.6 + 4;

    // Check if row overflows the page limit
    if (currentY + rowHeight > 270) {
      doc.addPage();
      currentY = 25;
      const currentPage = doc.getNumberOfPages();
      addHeaderFooter(currentPage, currentModuleTitle);

      // Redraw Table Header on new page
      doc.setFillColor(16, 84, 227);
      doc.rect(startX, currentY, colWidths.reduce((a, b) => a + b, 0), headerHeight, "F");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      
      let newHeaderX = startX;
      wrappedHeaders.forEach((lines, idx) => {
        lines.forEach((line: string, lineIdx: number) => {
          doc.text(line, newHeaderX + 1.5, currentY + 4 + (lineIdx * 3.6));
        });
        newHeaderX += colWidths[idx];
      });
      
      currentY += headerHeight;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
    }

    // Zebra striping
    if (rowIndex % 2 === 1) {
      doc.setFillColor(248, 250, 252); // Slate 50
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(startX, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, "F");

    // Draw row cell borders
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.1);
    doc.rect(startX, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, "S");

    // Draw cell texts
    let cellX = startX;
    wrappedCells.forEach((cellLines, colIdx) => {
      // Custom formatting for YES / NO status in columns
      const originalText = row[colIdx];
      if (originalText.includes("SIM") || originalText.includes("PODE")) {
        doc.setTextColor(21, 128, 61); // Green
        doc.setFont("Helvetica", "bold");
      } else if (originalText.includes("NAO") || originalText.includes("NÃO") || originalText.includes("EVITAR")) {
        doc.setTextColor(185, 28, 28); // Red
        doc.setFont("Helvetica", "bold");
      } else {
        doc.setTextColor(15, 23, 42); // Dark slate
        doc.setFont("Helvetica", "normal");
      }

      cellLines.forEach((line: string, lineIdx: number) => {
        doc.text(line, cellX + 1.5, currentY + 3.5 + (lineIdx * 3.6));
      });
      cellX += colWidths[colIdx];
    });

    currentY += rowHeight;
  });

  return currentY;
}

export function generateEbookPDF() {
  // Initialize jsPDF A4 document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 20;
  const contentWidth = pageWidth - (marginX * 2);
  let y = 20;

  // Helper colors
  const colorPrimary = [16, 84, 227]; // #1054E3 - Giro Clean Deep Blue
  const colorSecondary = [44, 179, 247]; // #2CB3F7 - Giro Clean Sky Blue
  const colorDark = [15, 23, 42]; // Slate 900
  const colorMuted = [100, 116, 139]; // Slate 500
  const colorLightBg = [240, 249, 255]; // Sky 50

  const setPrimaryColor = () => doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  const setSecondaryColor = () => doc.setTextColor(colorSecondary[0], colorSecondary[1], colorSecondary[2]);
  const setDarkColor = () => doc.setTextColor(colorDark[0], colorDark[1], colorDark[2]);
  const setMutedColor = () => doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);

  // Track section page numbers dynamically for Table of Contents & Bookmarks
  const sectionPages: { [key: string]: number } = {};

  // Helper to draw a running header on subsequent pages (footers are drawn during post-processing)
  const addHeaderFooter = (pageNumber: number, title?: string) => {
    doc.setPage(pageNumber);
    
    // Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(16, 84, 227);
    doc.text("METODO SSV", marginX, 12);
    
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    if (title) {
      const cleanTitle = sanitizeText(title);
      const truncatedTitle = cleanTitle.length > 50 ? cleanTitle.substring(0, 50) + "..." : cleanTitle;
      doc.text(truncatedTitle.toUpperCase(), marginX + 25, 12);
    }
    
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(marginX, 14, pageWidth - marginX, 14);
  };

  // Helper function to write text and automatically add a new page if it exceeds limits
  const checkPageOverflow = (neededHeight: number, currentModuleTitle?: string) => {
    if (y + neededHeight > pageHeight - 25) {
      doc.addPage();
      y = 25;
      const currentPage = doc.getNumberOfPages();
      addHeaderFooter(currentPage, currentModuleTitle);
    }
  };

  // 1. --- COVER PAGE (ADAPTED TO NEW MINIMALIST MODEL) ---
  // Background pure crisp white as shown in the model
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // A. STYLIZED CENTRAL BRAND LOGO (SSV Monogram in circle)
  const centerX = pageWidth / 2; // 105mm
  const logoY = 65; // centered in the upper third
  const logoRadius = 16;

  // Outer thin circle for the monogram
  doc.setDrawColor(28, 56, 121); // Navy blue accent color
  doc.setLineWidth(0.4);
  doc.circle(centerX, logoY, logoRadius, "S");

  // Thin interior circle accent
  doc.setLineWidth(0.15);
  doc.circle(centerX, logoY, logoRadius - 1.5, "S");

  // Intertwined classic monogram letters "SSV" inside
  doc.setFont("Times", "bold");
  doc.setFontSize(23);
  doc.setTextColor(28, 56, 121);
  doc.text("SSV", centerX, logoY + 5.5, { align: "center" });

  // B. MAIN CENTRAL TITLES
  // "MÉTODO"
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(80, 95, 125); // Slate blue
  doc.text("M É T O D O", centerX, 106, { align: "center" });

  // "SOFÁ"
  doc.setFont("Times", "bold");
  doc.setFontSize(44);
  doc.setTextColor(28, 56, 121); // Beautiful Rich Deep Navy
  doc.text("SOFÁ", centerX, 125, { align: "center" });

  // "SEMPRE NOVO"
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16.5);
  doc.setTextColor(28, 56, 121);
  doc.text("SEMPRE NOVO", centerX, 137, { align: "center" });

  // Elegant sub-feature list "LIMPAR • CONSERVAR • RESTAURAR"
  doc.setFont("Times", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(110, 125, 145);
  doc.text("LIMPAR   •   CONSERVAR   •   RESTAURAR", centerX, 147, { align: "center" });

  // Spaced metadata feature / Brand subtle badge (closer to text)
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(140, 145, 160);
  doc.text("GIRO CLEAN ACADEMY  |  MANUAL INTERATIVO COMPLETO", centerX, 162, { align: "center" });

  // C. DUAL-LAYERED WAVE GRAPHICS (at the bottom - adapted and inverted to match the model perfectly)
  // Light lavender/blue wave (rising to the right)
  doc.setFillColor(224, 230, 243); // Soft gray-blue wave
  doc.ellipse(165, 275, 170, 110, "F");

  // Deep rich navy blue wave (rising to the right)
  doc.setFillColor(28, 56, 121); // Solid navy blue bottom wave
  doc.ellipse(175, 285, 180, 115, "F");

  // Safe fill rectangle to cover the absolute bottom corners
  doc.setFillColor(28, 56, 121);
  doc.rect(0, 290, pageWidth, 7, "F");

  // 1.5 --- SUMÁRIO RESERVED PAGE (PAGE 2) ---
  doc.addPage();
  const sumarioPageNumber = 2;
  sectionPages["sumario"] = sumarioPageNumber;

  // 2. --- WELCOME PAGE ---
  doc.addPage();
  sectionPages["introducao"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Introdução");

  // Welcome Header
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  setPrimaryColor();
  doc.text(sanitizeText(bookIntro.welcome.title), marginX, y);
  y += 10;

  // Welcome Content
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  setDarkColor();
  const welcomeParagraphs = bookIntro.welcome.content.split("\n\n");
  welcomeParagraphs.forEach((paragraph) => {
    const wrappedP = doc.splitTextToSize(sanitizeText(paragraph), contentWidth);
    const textHeight = wrappedP.length * 5;
    checkPageOverflow(textHeight + 8, "Introdução");
    doc.text(wrappedP, marginX, y);
    y += textHeight + 6;
  });

  // Who Is It For Section
  y += 4;
  checkPageOverflow(50, "Introdução");
  doc.setFillColor(colorLightBg[0], colorLightBg[1], colorLightBg[2]);
  doc.setDrawColor(224, 242, 254);
  doc.roundedRect(marginX - 2, y, contentWidth + 4, 38, 3, 3, "FD");
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("PARA QUEM FOI FEITO ESTE MANUAL?", marginX + 2, y + 6);
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  setDarkColor();
  let bulletY = y + 12;
  bookIntro.welcome.whoIsItFor.forEach((target) => {
    doc.text(`* ${sanitizeText(target)}`, marginX + 4, bulletY);
    bulletY += 5;
  });
  y += 45;

  // How to use
  checkPageOverflow(25, "Introdução");
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("COMO UTILIZAR ESTE MANUAL:", marginX, y);
  y += 6;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  setDarkColor();
  const wrappedHow = doc.splitTextToSize(sanitizeText(bookIntro.welcome.howToUse), contentWidth);
  doc.text(wrappedHow, marginX, y);
  y += wrappedHow.length * 5 + 10;

  // Disclaimer / Copyright
  checkPageOverflow(25, "Introdução");
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  setMutedColor();
  const wrappedCopy = doc.splitTextToSize(sanitizeText(bookIntro.copyright), contentWidth);
  const wrappedDisc = doc.splitTextToSize(sanitizeText(bookIntro.disclaimer), contentWidth);
  doc.text(wrappedCopy, marginX, y);
  y += wrappedCopy.length * 4 + 2;
  doc.text(wrappedDisc, marginX, y);
  y += wrappedDisc.length * 4 + 10;

  // 3. --- MODULES GENERATION ---
  modules.forEach((module) => {
    doc.addPage();
    sectionPages[module.id] = doc.getNumberOfPages();
    y = 25;
    const currentModuleTitle = `${module.title}`;
    addHeaderFooter(doc.getNumberOfPages(), currentModuleTitle);

    // Module Title Banner
    doc.setFillColor(colorLightBg[0], colorLightBg[1], colorLightBg[2]);
    doc.roundedRect(marginX - 2, y, contentWidth + 4, 18, 2, 2, "F");
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    setPrimaryColor();
    doc.text(sanitizeText(module.title).toUpperCase(), marginX + 2, y + 7);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    setSecondaryColor();
    doc.text(sanitizeText(module.subtitle || "Giro Clean Academy"), marginX + 2, y + 13);
    y += 25;

    // Intro & Objective
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    setDarkColor();
    doc.text("OBJETIVO DO MODULO:", marginX, y);
    y += 5;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    setMutedColor();
    const wrappedObj = doc.splitTextToSize(sanitizeText(module.objective), contentWidth);
    doc.text(wrappedObj, marginX, y);
    y += (wrappedObj.length * 5) + 6;

    // Introduction paragraph
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    setDarkColor();
    const wrappedIntro = doc.splitTextToSize(sanitizeText(module.introduction), contentWidth);
    doc.text(wrappedIntro, marginX, y);
    y += (wrappedIntro.length * 5) + 10;

    // Explanation Section (parse markdown style headings and lists)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    setPrimaryColor();
    doc.text("CONTEUDO TECNICO E CONCEITOS:", marginX, y);
    y += 8;

    const lines = module.explanation.split("\n");
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("### ")) {
        const h3Text = trimmed.replace("### ", "");
        checkPageOverflow(12, currentModuleTitle);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10.5);
        setPrimaryColor();
        doc.text(sanitizeText(h3Text), marginX, y);
        y += 6;
      } else if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const liText = trimmed.replace(/^[\*\-]\s*/, "");
        const cleanText = liText.replace(/\*\*/g, ""); // strip bold indicators
        const wrappedLi = doc.splitTextToSize(`- ${sanitizeText(cleanText)}`, contentWidth - 4);
        checkPageOverflow(wrappedLi.length * 5 + 3, currentModuleTitle);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9.5);
        setDarkColor();
        doc.text(wrappedLi, marginX + 4, y);
        y += (wrappedLi.length * 5) + 3;
      } else {
        const cleanText = trimmed.replace(/\*\*/g, "");
        const wrappedText = doc.splitTextToSize(sanitizeText(cleanText), contentWidth);
        checkPageOverflow(wrappedText.length * 5 + 4, currentModuleTitle);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9.5);
        setDarkColor();
        doc.text(wrappedText, marginX, y);
        y += (wrappedText.length * 5) + 4;
      }
    });

    // Check page space for step-by-step
    checkPageOverflow(30, currentModuleTitle);
    y += 5;

    // Step-by-step Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    setPrimaryColor();
    doc.text("ROTEIRO PASSO A PASSO:", marginX, y);
    y += 7;

    // Render Steps
    module.stepByStep.forEach((step, index) => {
      const cleanStep = step.replace(/\*\*/g, "");
      const wrappedStep = doc.splitTextToSize(`${index + 1}. ${sanitizeText(cleanStep)}`, contentWidth - 4);
      checkPageOverflow(wrappedStep.length * 5 + 4, currentModuleTitle);
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      setPrimaryColor();
      doc.text(`${index + 1}.`, marginX, y);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      setDarkColor();
      doc.text(doc.splitTextToSize(sanitizeText(cleanStep), contentWidth - 8), marginX + 6, y);
      y += (wrappedStep.length * 5) + 4;
    });

    y += 4;

    // Expert Tips, Alerts and Common Errors Boxes
    // Expert Tips Box
    if (module.expertTips && module.expertTips.length > 0) {
      checkPageOverflow(25, currentModuleTitle);
      doc.setFillColor(240, 253, 244); // light green bg
      doc.setDrawColor(220, 252, 231);
      
      let totalTipHeight = 10;
      const wrappedTips = module.expertTips.map(tip => {
        const wrapped = doc.splitTextToSize(`[DICA] "${sanitizeText(tip)}"`, contentWidth - 6);
        totalTipHeight += wrapped.length * 4.5 + 2;
        return wrapped;
      });

      doc.roundedRect(marginX - 2, y, contentWidth + 4, totalTipHeight, 2, 2, "FD");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(21, 128, 61); // deep green
      doc.text("DICAS DO ESPECIALISTA GIRO CLEAN", marginX + 2, y + 5);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      let tipY = y + 10;
      wrappedTips.forEach(tip => {
        doc.text(tip, marginX + 2, tipY);
        tipY += (tip.length * 4.5) + 2;
      });
      y += totalTipHeight + 6;
    }

    // Common Errors Box
    if (module.commonErrors && module.commonErrors.length > 0) {
      checkPageOverflow(25, currentModuleTitle);
      doc.setFillColor(254, 242, 242); // light red bg
      doc.setDrawColor(254, 226, 226);
      
      let totalErrHeight = 10;
      const wrappedErrors = module.commonErrors.map(err => {
        const wrapped = doc.splitTextToSize(`- ${sanitizeText(err)}`, contentWidth - 6);
        totalErrHeight += wrapped.length * 4.5 + 2;
        return wrapped;
      });

      doc.roundedRect(marginX - 2, y, contentWidth + 4, totalErrHeight, 2, 2, "FD");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(185, 28, 28); // deep red
      doc.text("ERROS COMUNS A EVITAR", marginX + 2, y + 5);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      let errY = y + 10;
      wrappedErrors.forEach(err => {
        doc.text(err, marginX + 2, errY);
        errY += (err.length * 4.5) + 2;
      });
      y += totalErrHeight + 6;
    }

    // Practical Exercise Box
    if (module.practicalExercise) {
      checkPageOverflow(25, currentModuleTitle);
      doc.setFillColor(255, 251, 235); // light amber bg
      doc.setDrawColor(254, 243, 199);
      
      const wrappedEx = doc.splitTextToSize(sanitizeText(module.practicalExercise), contentWidth - 6);
      const boxHeight = (wrappedEx.length * 4.5) + 10;
      
      doc.roundedRect(marginX - 2, y, contentWidth + 4, boxHeight, 2, 2, "FD");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(180, 83, 9); // deep amber
      doc.text("EXERCICIO DE FIXACAO PRATICA", marginX + 2, y + 5);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(wrappedEx, marginX + 2, y + 10);
      y += boxHeight + 10;
    }
  });

  // 4. --- CONCLUSIONS ---
  doc.addPage();
  sectionPages["conclusao"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Conclusão");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  setPrimaryColor();
  doc.text(sanitizeText(conclusions.title), marginX, y);
  y += 10;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10.5);
  setDarkColor();
  const conclusionParagraphs = conclusions.content.split("\n\n");
  conclusionParagraphs.forEach((paragraph) => {
    const wrappedP = doc.splitTextToSize(sanitizeText(paragraph), contentWidth);
    checkPageOverflow(wrappedP.length * 5 + 6, "Conclusão");
    doc.text(wrappedP, marginX, y);
    y += (wrappedP.length * 5) + 6;
  });

  // Callout VIP Whatsapp on final conclusion page
  y += 6;
  checkPageOverflow(40, "Conclusão");
  doc.setFillColor(240, 253, 244); // green bg
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(0.5);
  doc.roundedRect(marginX - 2, y, contentWidth + 4, 32, 3, 3, "FD");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(21, 128, 61);
  doc.text("COMUNIDADE VIP NO WHATSAPP (GRUPO ABERTO)", marginX + 2, y + 6);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(21, 128, 61);
  const vipText = "Participe da nossa rede colaborativa aberta de alunos para trocar fotos de resultados, indicacoes de marcas de produtos de limpeza e dicas uteis com centenas de participantes.";
  const wrappedVipText = doc.splitTextToSize(vipText, contentWidth - 4);
  doc.text(wrappedVipText, marginX + 2, y + 12);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(16, 185, 129);
  doc.text("Link de Convite: chat.whatsapp.com/FFhzMpJGToACFDEkK9I9o1", marginX + 2, y + 26);
  y += 42;

  // 5. --- BONUS / SUPPLEMENTAL CONTENT ---

  // BÔNUS 1: TABELA COMPLETA DE DILUIÇÕES (Starts on dedicated page)
  doc.addPage();
  sectionPages["bonus1"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Bônus 1: Diluições");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  setPrimaryColor();
  doc.text(sanitizeText(bonusContent[0].title), marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setMutedColor();
  const wrappedBonus0Desc = doc.splitTextToSize(sanitizeText(bonusContent[0].description), contentWidth);
  doc.text(wrappedBonus0Desc, marginX, y);
  y += (wrappedBonus0Desc.length * 4.5) + 8;

  // Render Dilution Table safely
  if (bonusContent[0].columns && bonusContent[0].rows) {
    const colWidthsDilution = [38, 15, 18, 15, 18, 22, 44]; // Exactly 170mm
    y = drawTable(
      doc,
      bonusContent[0].columns,
      bonusContent[0].rows,
      colWidthsDilution,
      marginX,
      y,
      "Bônus 1: Diluições",
      checkPageOverflow,
      addHeaderFooter
    );
  }

  // BÔNUS 2: CHECKLIST PROFISSIONAL DE HIGIENIZAÇÃO (Starts on dedicated page)
  doc.addPage();
  sectionPages["bonus2"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Bônus 2: Checklist");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  setPrimaryColor();
  doc.text(sanitizeText(bonusContent[1].title), marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setMutedColor();
  const wrappedBonus1Desc = doc.splitTextToSize(sanitizeText(bonusContent[1].description), contentWidth);
  doc.text(wrappedBonus1Desc, marginX, y);
  y += (wrappedBonus1Desc.length * 4.5) + 10;

  // Render nicely styled checkboxes
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setDarkColor();

  if (bonusContent[1].items) {
    bonusContent[1].items.forEach((item) => {
      const cleanItem = sanitizeText(item);
      const wrappedItem = doc.splitTextToSize(cleanItem, contentWidth - 12);
      const itemHeight = wrappedItem.length * 5;

      checkPageOverflow(itemHeight + 4, "Bônus 2: Checklist");

      // Draw custom checkbox square
      doc.setDrawColor(16, 84, 227); // Blue border
      doc.setLineWidth(0.4);
      doc.rect(marginX, y, 4, 4);

      // Text next to checkbox
      doc.setFont("Helvetica", "normal");
      doc.text(wrappedItem, marginX + 8, y + 3.2);
      y += itemHeight + 5;
    });
  }

  // BÔNUS 3: TABELA PODE OU NÃO PODE (Starts on dedicated page)
  doc.addPage();
  sectionPages["bonus3"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Bônus 3: Pode ou Não Pode");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  setPrimaryColor();
  doc.text(sanitizeText(bonusContent[2].title), marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setMutedColor();
  const wrappedBonus2Desc = doc.splitTextToSize(sanitizeText(bonusContent[2].description), contentWidth);
  doc.text(wrappedBonus2Desc, marginX, y);
  y += (wrappedBonus2Desc.length * 4.5) + 8;

  // Render Can/Cannot Fabric Grid
  if (bonusContent[2].columns && bonusContent[2].rows) {
    const colWidthsCanCannot = [38, 15, 72, 45]; // Exactly 170mm
    y = drawTable(
      doc,
      bonusContent[2].columns,
      bonusContent[2].rows,
      colWidthsCanCannot,
      marginX,
      y,
      "Bônus 3: Pode ou Não Pode",
      checkPageOverflow,
      addHeaderFooter
    );
  }

  // BÔNUS 4: CALENDÁRIO ANUAL DE MANUTENÇÃO DO SOFÁ (Starts on dedicated page)
  doc.addPage();
  sectionPages["bonus4"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Bônus 4: Calendário Anual");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  setPrimaryColor();
  doc.text(sanitizeText(bonusContent[3].title), marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setMutedColor();
  const wrappedBonus3Desc = doc.splitTextToSize(sanitizeText(bonusContent[3].description), contentWidth);
  doc.text(wrappedBonus3Desc, marginX, y);
  y += (wrappedBonus3Desc.length * 4.5) + 10;

  const schedules = bonusContent[3].schedules;

  // Card 1: Heavy Duty (Pets / Kids)
  checkPageOverflow(80, "Bônus 4: Calendário Anual");
  doc.setFillColor(254, 242, 242); // Light Red
  doc.setDrawColor(254, 226, 226);
  doc.roundedRect(marginX - 2, y, contentWidth + 4, 46, 3, 3, "FD");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(185, 28, 28);
  doc.text(sanitizeText(schedules.heavy.title), marginX + 2, y + 6);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`- Semanal: ${sanitizeText(schedules.heavy.weekly)}`, marginX + 4, y + 14);
  doc.text(`- Mensal: ${sanitizeText(schedules.heavy.monthly)}`, marginX + 4, y + 21);
  doc.text(`- Bimestral: ${sanitizeText(schedules.heavy.bimonthly)}`, marginX + 4, y + 28);
  doc.text(`- Anual: ${sanitizeText(schedules.heavy.annual)}`, marginX + 4, y + 35);

  y += 54;

  // Card 2: Moderate Duty
  checkPageOverflow(80, "Bônus 4: Calendário Anual");
  doc.setFillColor(240, 249, 255); // Light Blue
  doc.setDrawColor(224, 242, 254);
  doc.roundedRect(marginX - 2, y, contentWidth + 4, 46, 3, 3, "FD");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(16, 84, 227);
  doc.text(sanitizeText(schedules.moderate.title), marginX + 2, y + 6);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`- Semanal: ${sanitizeText(schedules.moderate.weekly)}`, marginX + 4, y + 14);
  doc.text(`- Mensal: ${sanitizeText(schedules.moderate.monthly)}`, marginX + 4, y + 21);
  doc.text(`- Semestral: ${sanitizeText(schedules.moderate.semiannual)}`, marginX + 4, y + 28);
  doc.text(`- Bienal: ${sanitizeText(schedules.moderate.biennial)}`, marginX + 4, y + 35);

  // BÔNUS 5: EBOOK DIGITAL EM FORMATO PDF (Starts on dedicated final page)
  doc.addPage();
  sectionPages["bonus5"] = doc.getNumberOfPages();
  y = 25;
  addHeaderFooter(doc.getNumberOfPages(), "Metodo Sofa Sempre Novo");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  setPrimaryColor();
  doc.text(sanitizeText(bonusContent[4].title), marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  setMutedColor();
  const wrappedBonus4Desc = doc.splitTextToSize(sanitizeText(bonusContent[4].description), contentWidth);
  doc.text(wrappedBonus4Desc, marginX, y);
  y += (wrappedBonus4Desc.length * 4.5) + 12;

  // List of features
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("DIFERENCIAIS DESTE MATERIAL DE CONSULTA:", marginX, y);
  y += 8;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  setDarkColor();
  bonusContent[4].features.forEach((feature) => {
    doc.text(`- ${sanitizeText(feature)}`, marginX + 4, y);
    y += 7;
  });

  y += 15;

  // Beautiful centered seal
  checkPageOverflow(50, "Metodo Sofa Sempre Novo");
  doc.setDrawColor(241, 245, 249);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(30, y, pageWidth - 60, 42, 4, 4, "FD");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  setPrimaryColor();
  doc.text("METODO SOFA SEMPRE NOVO", pageWidth / 2, y + 10, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  setMutedColor();
  const certLines = [
    "Este certificado virtual garante que voce adquiriu o manual oficial",
    "do Metodo Sofa Sempre Novo. Aplique as regras com paciencia",
    "e desfrute de um estofado higienizado e revitalizado todos os dias!"
  ];
  certLines.forEach((line, idx) => {
    doc.text(line, pageWidth / 2, y + 19 + (idx * 5.5), { align: "center" });
  });

  // --- DRAW THE TABLE OF CONTENTS ON RESERVED PAGE 2 ---
  doc.setPage(sumarioPageNumber);

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(28, 56, 121); // Navy blue
  doc.text("SUMARIO DO MANUAL EXECUTIVO", centerX, 25, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Clique em qualquer capitulo abaixo para navegar diretamente para a pagina correspondente.", centerX, 31, { align: "center" });

  // Border frame card around sumario
  doc.setFillColor(248, 250, 252); // Soft grey (Slate 50)
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX - 4, 38, contentWidth + 8, 236, 4, 4, "FD");

  let itemY = 48;
  const sumarioItems = [
    { label: "Introducao: Boas-vindas ao Metodo", key: "introducao" },
    { label: "Modulo 1: Desvendando o Tecido do seu Sofa", key: "modulo-1" },
    { label: "Modulo 2: O Arsenal de Produtos de Supermercado", key: "modulo-2" },
    { label: "Modulo 3: As 4 Etapas da Higienizacao Perfeita", key: "modulo-3" },
    { label: "Modulo 4: Secagem Rapida e Prevencao de Mofo", key: "modulo-4" },
    { label: "Modulo 5: Guia de Socorro contra Manchas", key: "modulo-5" },
    { label: "Modulo 6: Impermeabilizacao e Protecao de Fibras", key: "modulo-6" },
    { label: "Modulo 7: Guia de Sobrevivencia contra Xixi de Pets", key: "modulo-7" },
    { label: "Conclusao: Sua Jornada de Especialista", key: "conclusao" },
    { label: "Bonus 1: Tabela Completa de Diluicoes", key: "bonus1" },
    { label: "Bonus 2: Checklist Profissional de Higienizacao", key: "bonus2" },
    { label: "Bonus 3: Tabela Pode ou Nao Pode nos Tecidos", key: "bonus3" },
    { label: "Bonus 4: Calendario Anual de Manutencao", key: "bonus4" },
    { label: "Bonus 5: Certificado Oficial Metodo SSV", key: "bonus5" },
  ];

  sumarioItems.forEach((item) => {
    const targetPage = sectionPages[item.key] || 3;
    const pageStr = `${targetPage}`;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42); // Dark slate
    doc.text(sanitizeText(item.label), marginX, itemY);

    // Calculate dotted connector
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(148, 163, 184); // Muted grey
    const labelWidth = doc.getTextWidth(sanitizeText(item.label));
    const pageStrWidth = doc.getTextWidth(pageStr);
    const startDotsX = marginX + labelWidth + 3;
    const endDotsX = pageWidth - marginX - pageStrWidth - 3;

    let dots = "";
    const dotsCount = Math.floor((endDotsX - startDotsX) / 1.5);
    for (let i = 0; i < dotsCount; i++) dots += ".";
    doc.text(dots, startDotsX, itemY);

    // Page number text
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(16, 84, 227); // Brand blue
    doc.text(pageStr, pageWidth - marginX, itemY, { align: "right" });

    // Link overlay
    doc.link(marginX, itemY - 4, contentWidth, 6, { pageNumber: targetPage });

    itemY += 15; // Beautiful spacing
  });

  const totalPages = doc.getNumberOfPages();

  // --- DRAW UNIFORM FOOTERS ON ALL PAGES FROM PAGE 2 TO END ---
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);

    // Footer rule line
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.15);
    doc.line(marginX, pageHeight - 16, pageWidth - marginX, pageHeight - 16);

    // Left brand text
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Metodo Sofa Sempre Novo - SSV", marginX, pageHeight - 11);

    // Right page numbering (X of Y)
    doc.text(`Pagina ${p} de ${totalPages}`, pageWidth - marginX, pageHeight - 11, { align: "right" });

    // Center clickable link "« VOLTAR AO SUMÁRIO" (Only on content pages, Page 3 or later)
    if (p >= 3) {
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(16, 84, 227); // Brand blue
      doc.text("<< VOLTAR AO SUMARIO", centerX, pageHeight - 11, { align: "center" });

      // Clickable region
      doc.link(centerX - 18, pageHeight - 14, 36, 5, { pageNumber: sumarioPageNumber });
    }
  }

  // --- GENERATE PDF DOCUMENT BOOKMARKS OUTLINE TREE ---
  try {
    const outline = (doc as any).outline;
    if (outline) {
      const rootNode = outline.add(null, "Metodo Sofa Sempre Novo", { pageNumber: 1 });
      outline.add(rootNode, "Introducao", { pageNumber: sectionPages["introducao"] });
      
      modules.forEach((mod, idx) => {
        outline.add(rootNode, `Modulo ${idx + 1}: ${mod.title.replace(/^MÓDULO \d+:\s*/, "")}`, { pageNumber: sectionPages[mod.id] });
      });
      
      outline.add(rootNode, "Conclusao", { pageNumber: sectionPages["conclusao"] });
      outline.add(rootNode, "Bonus 1: Diluicoes", { pageNumber: sectionPages["bonus1"] });
      outline.add(rootNode, "Bonus 2: Checklist", { pageNumber: sectionPages["bonus2"] });
      outline.add(rootNode, "Bonus 3: Pode ou Nao Pode", { pageNumber: sectionPages["bonus3"] });
      outline.add(rootNode, "Bonus 4: Calendario Anual", { pageNumber: sectionPages["bonus4"] });
      outline.add(rootNode, "Bonus 5: Certificado", { pageNumber: sectionPages["bonus5"] });
    }
  } catch (err) {
    console.error("Error creating PDF outline bookmarks:", err);
  }

  // Save the generated PDF file directly to client's download folder
  doc.save("Manual_Metodo_Sofa_Sempre_Novo_SSV.pdf");
}
