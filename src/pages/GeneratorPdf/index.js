// App.js

import React from 'react';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';



function index(props) {
    const handlePdf = () => {
        const input = document.getElementById('root');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt');
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'JPEG', 0, 0, 350, 370);
                pdf.save("test.pdf");
            });
    };

    return (

        <div>

            <button onClick={() => handlePdf()} type="primary">Download PNG</button>
        </div>

    )
}

export default index
