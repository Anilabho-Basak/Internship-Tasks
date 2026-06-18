const PDFDocument = require('pdfkit');

// @desc    Generate a PDF Certificate for the logged-in user
// @route   GET /api/certificates/generate
// @access  Private
const generateCertificate = async (req, res) => {
    try {
        // Create a new PDF document (Landscape orientation)
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
        });

        // Tell Postman/Browser that a PDF file is coming, not just JSON data
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=certificate_${req.user.name}.pdf`);

        // Pipe the PDF directly to the user's screen
        doc.pipe(res);

        // --- DRAWING THE CERTIFICATE ---
        // 1. Draw a border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke(); 
        
        // 2. Add the text
        doc.moveDown(3);
        doc.fontSize(40).text('CERTIFICATE OF COMPLETION', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(20).text('This is proudly presented to', { align: 'center' });
        doc.moveDown();
        
        // 3. Dynamically insert the logged-in user's name in blue!
        doc.fontSize(35).fillColor('#2563eb').text(req.user.name, { align: 'center' }); 
        doc.moveDown();
        
        doc.fontSize(20).fillColor('black').text('For successfully completing the Internship Development Program.', { align: 'center' });
        doc.moveDown(2);
        
        // 4. Add today's date
        doc.fontSize(15).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

        // Finalize the PDF and send it
        doc.end();

    } catch (error) {
        console.error("CERTIFICATE CRASH:", error);
        res.status(500).json({ message: 'Server error generating certificate' });
    }
};

module.exports = { generateCertificate };