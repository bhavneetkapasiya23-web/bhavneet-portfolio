import { PDFDocument, PDFString, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();

  // Standard Letter page dimensions: 612 x 792 pt
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 38;
  const contentWidth = pageWidth - margin * 2; // 536 pt

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let y = pageHeight - margin;

  const primaryColor = rgb(0.08, 0.1, 0.14);
  const subColor = rgb(0.28, 0.32, 0.38);
  const linkColor = rgb(0.1, 0.35, 0.82); // clean professional link blue
  const ruleColor = rgb(0.7, 0.73, 0.78);

  function createLink(x, linkY, width, height, url) {
    const annot = pdfDoc.context.register(
      pdfDoc.context.obj({
        Type: 'Annot',
        Subtype: 'Link',
        Rect: [x - 2, linkY - 3, x + width + 2, linkY + height + 4],
        Border: [0, 0, 0],
        F: 4,
        A: {
          Type: 'Action',
          S: 'URI',
          URI: PDFString.of(url),
        },
      })
    );
    page.node.addAnnot(annot);
  }

  function drawText(text, x, currentY, size, font, color = primaryColor) {
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
  }

  function drawCenteredText(text, currentY, size, font, color = primaryColor) {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (pageWidth - textWidth) / 2;
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
    return { x, width: textWidth };
  }

  function drawSectionHeader(title) {
    y -= 13;
    drawText(title, margin, y, 9.5, helveticaBold, primaryColor);
    y -= 3.5;
    page.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 0.75,
      color: ruleColor,
    });
    y -= 9;
  }

  function wrapText(text, maxWidth, font, size) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawParagraph(text, maxWidth, size, font, lineHeight, color = primaryColor, x = margin) {
    const lines = wrapText(text, maxWidth, font, size);
    for (const line of lines) {
      drawText(line, x, y, size, font, color);
      y -= lineHeight;
    }
  }

  function drawBulletPoint(text, maxWidth = contentWidth - 14, size = 8.5, font = helvetica, lineHeight = 11) {
    const bulletX = margin + 3;
    const textX = margin + 13;
    drawText('•', bulletX, y, size, helveticaBold, primaryColor);
    const lines = wrapText(text, maxWidth, font, size);
    for (let i = 0; i < lines.length; i++) {
      drawText(lines[i], textX, y, size, font, primaryColor);
      y -= lineHeight;
    }
  }

  function drawLiveDemoLink(label, linkText, url) {
    const labelWidth = helveticaBold.widthOfTextAtSize(label + ' ', 8.5);
    const linkWidth = helveticaBold.widthOfTextAtSize(linkText, 8.5);
    const startX = margin + 13;

    // Draw label "Live Demo: "
    drawText(label + ' ', startX, y, 8.5, helveticaBold, primaryColor);

    // Draw clickable link text in blue
    const linkX = startX + labelWidth;
    drawText(linkText, linkX, y, 8.5, helveticaBold, linkColor);

    // Draw underline
    page.drawLine({
      start: { x: linkX, y: y - 1 },
      end: { x: linkX + linkWidth, y: y - 1 },
      thickness: 0.65,
      color: linkColor,
    });

    // Create interactive PDF hyperlink annotation
    createLink(linkX, y, linkWidth, 8.5, url);

    y -= 11.5;
  }

  // --- HEADER ---
  drawCenteredText('BHAVNEET', y, 20, helveticaBold, primaryColor);
  y -= 14;
  drawCenteredText('Software Engineer | Full-Stack Developer | AI-Integrated Web Applications', y, 9.5, helvetica, subColor);
  y -= 12;

  // Header Contact Line with interactive links
  const contactText1 = 'Meerut, Uttar Pradesh  |  ';
  const phoneText = '+91 7417634695';
  const contactText2 = '  |  ';
  const emailText = 'bhavneetkapasiya23@gmail.com';
  const contactText3 = '  |  ';
  const githubText = 'github.com/bhavneetkapasiya23-web';

  const fullContactStr = contactText1 + phoneText + contactText2 + emailText + contactText3 + githubText;
  const fullWidth = helvetica.widthOfTextAtSize(fullContactStr, 8.5);
  let curX = (pageWidth - fullWidth) / 2;

  drawText(contactText1, curX, y, 8.5, helvetica, subColor);
  curX += helvetica.widthOfTextAtSize(contactText1, 8.5);

  // Phone link
  const phoneWidth = helvetica.widthOfTextAtSize(phoneText, 8.5);
  drawText(phoneText, curX, y, 8.5, helvetica, primaryColor);
  createLink(curX, y, phoneWidth, 8.5, 'tel:+917417634695');
  curX += phoneWidth;

  drawText(contactText2, curX, y, 8.5, helvetica, subColor);
  curX += helvetica.widthOfTextAtSize(contactText2, 8.5);

  // Email link
  const emailWidth = helvetica.widthOfTextAtSize(emailText, 8.5);
  drawText(emailText, curX, y, 8.5, helvetica, linkColor);
  page.drawLine({
    start: { x: curX, y: y - 1 },
    end: { x: curX + emailWidth, y: y - 1 },
    thickness: 0.65,
    color: linkColor,
  });
  createLink(curX, y, emailWidth, 8.5, 'mailto:bhavneetkapasiya23@gmail.com');
  curX += emailWidth;

  drawText(contactText3, curX, y, 8.5, helvetica, subColor);
  curX += helvetica.widthOfTextAtSize(contactText3, 8.5);

  // GitHub link (pointing to verified working profile https://github.com/bhavneetkapasiya23-web)
  const githubWidth = helvetica.widthOfTextAtSize(githubText, 8.5);
  drawText(githubText, curX, y, 8.5, helvetica, linkColor);
  page.drawLine({
    start: { x: curX, y: y - 1 },
    end: { x: curX + githubWidth, y: y - 1 },
    thickness: 0.65,
    color: linkColor,
  });
  createLink(curX, y, githubWidth, 8.5, 'https://github.com/bhavneetkapasiya23-web');

  y -= 6;
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: rgb(0.2, 0.22, 0.26),
  });

  // --- 1. PROFESSIONAL SUMMARY ---
  drawSectionHeader('PROFESSIONAL SUMMARY');
  drawParagraph(
    'Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience designing, developing, and deploying full-stack web applications. Skilled in JavaScript, Python, Java, SQL, React.js, Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, Stripe integration, WebSockets, and LLM API integration. Seeking a Software Engineer, Full-Stack Developer, or AI-focused internship/entry-level role.',
    contentWidth,
    8.5,
    helvetica,
    11.5,
    primaryColor
  );

  // --- 2. TECHNICAL SKILLS ---
  drawSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Programming Languages:', val: 'JavaScript, Python, Java, SQL' },
    { label: 'Frontend:', val: 'React.js, TypeScript, HTML5, CSS3, Tailwind CSS, Recharts' },
    { label: 'Backend:', val: 'Node.js, Express.js, REST API Design, JWT Authentication, WebSockets' },
    { label: 'Databases:', val: 'PostgreSQL, Neon PostgreSQL, Prisma ORM' },
    { label: 'AI / Machine Learning:', val: 'Artificial Intelligence, Prompt Engineering, LLM API Integration, OpenRouter API' },
    { label: 'Tools & Platforms:', val: 'Git, GitHub, Vercel, Postman, VS Code, Stripe API' },
    { label: 'Computer Science:', val: 'Data Structures and Algorithms, Object-Oriented Programming' },
  ];

  for (const s of skills) {
    const labelWidth = helveticaBold.widthOfTextAtSize(s.label + ' ', 8.5);
    drawText(s.label, margin, y, 8.5, helveticaBold, primaryColor);
    drawText(s.val, margin + labelWidth, y, 8.5, helvetica, primaryColor);
    y -= 11;
  }

  // --- 3. PROJECTS ---
  drawSectionHeader('PROJECTS');

  // Project 1: AI Website Builder (2025)
  drawText('AI Website Builder', margin, y, 9.5, helveticaBold, primaryColor);
  const year1 = '2025';
  drawText(year1, pageWidth - margin - helvetica.widthOfTextAtSize(year1, 8.5), y, 8.5, helvetica, subColor);
  y -= 10.5;
  drawText('React.js, Node.js, Express.js, PostgreSQL, Prisma, OpenRouter API, Stripe', margin, y, 8, helveticaOblique, subColor);
  y -= 10;
  drawBulletPoint('Developed a full-stack AI-powered website generator that converts natural-language prompts into complete deployable websites using the OpenRouter API.');
  drawBulletPoint('Implemented a credit-based usage and payment system using Stripe, enabling users to purchase and consume generation credits.');
  drawBulletPoint('Implemented secure JWT-based authentication and authorization for user accounts and protected API routes.');
  drawBulletPoint('Designed database models for users, projects, credits, and payment records using PostgreSQL and Prisma ORM on Neon.');
  drawBulletPoint('Deployed the application on Vercel, completing the full development-to-production deployment lifecycle.');
  drawLiveDemoLink('Live Demo:', 'AI Website Builder', 'https://ai-site-builder-2tq6.vercel.app/');

  // Project 2: Real-Time Stock Dashboard (2025)
  drawText('Real-Time Stock Dashboard', margin, y, 9.5, helveticaBold, primaryColor);
  const year2 = '2025';
  drawText(year2, pageWidth - margin - helvetica.widthOfTextAtSize(year2, 8.5), y, 8.5, helvetica, subColor);
  y -= 10.5;
  drawText('React.js, TypeScript, Recharts, WebSockets', margin, y, 8, helveticaOblique, subColor);
  y -= 10;
  drawBulletPoint('Developed a responsive stock market dashboard that streams and renders live price data using WebSockets.');
  drawBulletPoint('Built reusable, strongly typed TypeScript components with Recharts to visualize price trends and historical market movement.');
  drawBulletPoint('Structured client-side state management for continuous incoming data streams to maintain smooth UI performance.');
  drawLiveDemoLink('Live Demo:', 'Live Stock Dashboard', 'https://live-stock-dashboard-tau.vercel.app/');

  // Project 3: AI-Powered Observability Platform (2026)
  drawText('AI-Powered Observability Platform', margin, y, 9.5, helveticaBold, primaryColor);
  const year3 = '2026';
  drawText(year3, pageWidth - margin - helvetica.widthOfTextAtSize(year3, 8.5), y, 8.5, helvetica, subColor);
  y -= 10.5;
  drawText('React.js, Tailwind CSS, TypeScript, AI Anomaly Detection, REST APIs', margin, y, 8, helveticaOblique, subColor);
  y -= 10;
  drawBulletPoint('Engineered an AI-assisted cloud observability dashboard (GleanInsights) for system metrics, microservice distributed logs, and automated root-cause anomaly detection.');
  drawBulletPoint('Building a responsive component-driven React interface with modular telemetry widgets, latency heatmaps, and error rate monitoring.');
  drawBulletPoint('Integrated AI-based anomaly detection and automated root-cause analysis for accelerated incident triage.');
  drawLiveDemoLink('Live Demo:', 'Glean Insights', 'https://gleaninsights.vercel.app');

  // --- 4. EDUCATION ---
  drawSectionHeader('EDUCATION');
  
  // MIET
  drawText('Bachelor of Technology, Computer Science and Engineering (Artificial Intelligence)', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear1 = '2023 – Pursuing';
  drawText(edYear1, pageWidth - margin - helvetica.widthOfTextAtSize(edYear1, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Meerut Institute of Engineering and Technology (MIET), Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 9.5;

  // Class XII
  drawText('Senior Secondary (Class XII), CBSE', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear2 = '2022 – 2023';
  drawText(edYear2, pageWidth - margin - helvetica.widthOfTextAtSize(edYear2, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Vardhman Academy, Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 9.5;

  // Class X
  drawText('Secondary (Class X), CBSE', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear3 = '2020 – 2021';
  drawText(edYear3, pageWidth - margin - helvetica.widthOfTextAtSize(edYear3, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Vardhman Academy, Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 7.5;

  // --- 5. CERTIFICATIONS ---
  drawSectionHeader('CERTIFICATIONS');
  drawText('JavaScript Fundamentals — GreatStack   |   React Hooks Course — GreatStack', margin, y, 8.5, helvetica, primaryColor);
  y -= 7.5;

  // --- 6. CORE STRENGTHS ---
  drawSectionHeader('CORE STRENGTHS');
  drawText('Problem Solving  |  Analytical Thinking  |  Communication  |  Teamwork  |  Adaptability  |  Time Management', margin, y, 8.5, helvetica, primaryColor);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/Bhavneet_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Pristine interactive Resume PDF with live clickable link annotations generated at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
