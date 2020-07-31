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
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'JPEG', 200, 50, 250, 500);
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    const blob = pdf.output();
                    window.open(URL.createObjectURL(blob));
                }
                else {
                    pdf.save('filename.pdf');
                }
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
