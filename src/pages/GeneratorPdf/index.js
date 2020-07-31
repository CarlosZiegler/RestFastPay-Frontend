// App.js

import React from 'react';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import './style.css'



function index(props) {
    const handlePdf = () => {
        const input = document.getElementById('root');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt');

                pdf.addImage(imgData, 'JPEG', 50, 50, 450, 500);

                var blobPDF = new Blob([pdf.output('blob')], { type: 'application/pdf' });
                var blobUrl = URL.createObjectURL(blobPDF);  //<--- THE ERROR APPEARS HERE

                window.open(blobUrl);
                pdf.save("recipient.pdf");
            });
    };

    return (

        <div className="btn-get-recipient">
            <button className="btn-green-recipient" onClick={() => handlePdf()} type="primary">GET RECEIPT</button>
        </div>

    )
}

export default index
