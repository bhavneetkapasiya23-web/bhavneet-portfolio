import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter size: 612 x 792
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2; // 532

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let y = pageHeight - margin;

  const primaryColor = rgb(0.1, 0.12, 0.15); // near black
  const subColor = rgb(0.25, 0.28, 0.32);
  const accentBlue = rgb(0.12, 0.35, 0.75); // professional link blue
  const ruleColor = rgb(0.65, 0.68, 0.72);

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
  }

  function drawSectionHeader(title) {
    y -= 14;
    drawText(title, margin, y, 9.5, helveticaBold, primaryColor);
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: pageWidth - margin, y: y },
      thickness: 0.75,
      color: ruleColor,
    });
    y -= 10;
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
    const bulletX = margin + 4;
    const textX = margin + 14;
    drawText('•', bulletX, y, size, helveticaBold, primaryColor);
    const lines = wrapText(text, maxWidth, font, size);
    for (let i = 0; i < lines.length; i++) {
      drawText(lines[i], textX, y, size, font, primaryColor);
      y -= lineHeight;
    }
  }

  // HEADER
  drawCenteredText('BHAVNEET', y, 19, helveticaBold, primaryColor);
  y -= 14;
  drawCenteredText('Software Engineer | Full-Stack Developer | AI-Integrated Web Applications', y, 9.5, helvetica, subColor);
  y -= 12;
  drawCenteredText('Meerut, Uttar Pradesh | +91 7417634695 | bhavneetkapasiya23@gmail.com | github.com/bhavneetkapasiya23', y, 8.5, helvetica, subColor);
  y -= 6;
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: rgb(0.2, 0.2, 0.2),
  });

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader('PROFESSIONAL SUMMARY');
  drawParagraph(
    'Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience designing, developing, and deploying full-stack web applications. Skilled in JavaScript, Python, Java, SQL, React.js, Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, Stripe integration, WebSockets, and LLM API integration. Seeking a Software Engineer, Full-Stack Developer, or AI-focused internship/entry-level role.',
    contentWidth,
    8.5,
    helvetica,
    11.5,
    primaryColor
  );

  // 2. TECHNICAL SKILLS
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

  // 3. PROJECTS
  drawSectionHeader('PROJECTS');

  // Project 1: AI Website Builder
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
  
  // Live Demo link
  drawText('Live Demo: ', margin + 14, y, 8.5, helveticaBold, primaryColor);
  drawText('AI Website Builder (https://ai-site-builder-2tq6.vercel.app/)', margin + 14 + helveticaBold.widthOfTextAtSize('Live Demo: ', 8.5), y, 8.5, helvetica, accentBlue);
  y -= 12;

  // Project 2: Real-Time Stock Dashboard
  drawText('Real-Time Stock Dashboard', margin, y, 9.5, helveticaBold, primaryColor);
  const year2 = '2025';
  drawText(year2, pageWidth - margin - helvetica.widthOfTextAtSize(year2, 8.5), y, 8.5, helvetica, subColor);
  y -= 10.5;
  drawText('React.js, TypeScript, Recharts, WebSockets', margin, y, 8, helveticaOblique, subColor);
  y -= 10;
  drawBulletPoint('Developed a responsive stock market dashboard that streams and renders live price data using WebSockets.');
  drawBulletPoint('Built reusable, strongly typed TypeScript components with Recharts to visualize price trends and historical market movement.');
  drawBulletPoint('Structured client-side state management for continuous incoming data streams to maintain smooth UI performance.');
  
  // Live Demo link
  drawText('Live Demo: ', margin + 14, y, 8.5, helveticaBold, primaryColor);
  drawText('Live Stock Dashboard (https://live-stock-dashboard-tau.vercel.app/)', margin + 14 + helveticaBold.widthOfTextAtSize('Live Demo: ', 8.5), y, 8.5, helvetica, accentBlue);
  y -= 12;

  // Project 3: AI-Powered Observability Platform
  drawText('AI-Powered Observability Platform', margin, y, 9.5, helveticaBold, primaryColor);
  const year3 = '2025';
  drawText(year3, pageWidth - margin - helvetica.widthOfTextAtSize(year3, 8.5), y, 8.5, helvetica, subColor);
  y -= 10.5;
  drawText('React.js, Tailwind CSS, TypeScript, AI Anomaly Detection, REST APIs', margin, y, 8, helveticaOblique, subColor);
  y -= 10;
  drawBulletPoint('Engineered an AI-assisted cloud observability dashboard (GleanInsights) for system metrics, microservice distributed logs, and automated root-cause anomaly detection.');
  drawBulletPoint('Building a responsive component-driven React interface with modular telemetry widgets, latency heatmaps, and error rate monitoring.');
  drawBulletPoint('Integrated AI-based anomaly detection and automated root-cause analysis for accelerated incident triage.');
  
  // Live Demo link
  drawText('Live Demo: ', margin + 14, y, 8.5, helveticaBold, primaryColor);
  drawText('Glean Insights (https://gleaninsights.vercel.app)', margin + 14 + helveticaBold.widthOfTextAtSize('Live Demo: ', 8.5), y, 8.5, helvetica, accentBlue);
  y -= 10;

  // 4. EDUCATION
  drawSectionHeader('EDUCATION');
  
  // MIET
  drawText('Bachelor of Technology, Computer Science and Engineering (Artificial Intelligence)', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear1 = '2023 – Pursuing';
  drawText(edYear1, pageWidth - margin - helvetica.widthOfTextAtSize(edYear1, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Meerut Institute of Engineering and Technology (MIET), Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 10;

  // Class XII
  drawText('Senior Secondary (Class XII), CBSE', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear2 = '2022 – 2023';
  drawText(edYear2, pageWidth - margin - helvetica.widthOfTextAtSize(edYear2, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Vardhman Academy, Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 10;

  // Class X
  drawText('Secondary (Class X), CBSE', margin, y, 8.5, helveticaBold, primaryColor);
  const edYear3 = '2020 – 2021';
  drawText(edYear3, pageWidth - margin - helvetica.widthOfTextAtSize(edYear3, 8), y, 8, helvetica, subColor);
  y -= 10;
  drawText('Vardhman Academy, Meerut, Uttar Pradesh', margin, y, 8, helvetica, subColor);
  y -= 8;

  // 5. CERTIFICATIONS
  drawSectionHeader('CERTIFICATIONS');
  drawText('JavaScript Fundamentals — GreatStack   |   React Hooks Course — GreatStack', margin, y, 8.5, helvetica, primaryColor);
  y -= 8;

  // 6. CORE STRENGTHS
  drawSectionHeader('CORE STRENGTHS');
  drawText('Problem Solving  |  Analytical Thinking  |  Communication  |  Teamwork  |  Adaptability  |  Time Management', margin, y, 8.5, helvetica, primaryColor);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/Bhavneet_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume PDF generated successfully at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
