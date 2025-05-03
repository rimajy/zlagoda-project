export const usePrint = () => {
  const handlePrint = (htmlStringToPrint: string, title: string, header: string) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      const stringToPrint = `
        <html>
          <head>
            <title>${title}</title>
            <style>
              * {
                font-size: 12px;
                font-family: Arial, sans-serif;
              }
              h1 {
                font-size: 20px;
              }
              body {
                padding: 5px;
              }
              table {
                width: 100%;
              }
              th, td {
                text-align: left;
                padding: 8px 10px;
              }
            </style>
          </head>
          <body>
            <h1>${header}</h1>
            ${htmlStringToPrint}
          </body>
        </html>
      `;

      printWindow.document.write(stringToPrint);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 100);
    } else {
      alert('Failed to open print window');
    }
  };

  return handlePrint;
}