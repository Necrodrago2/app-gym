package com.example.demo.services;

import com.example.demo.models.Order;
import com.example.demo.models.OrderItem;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public ByteArrayInputStream generateOrderReceipt(Order order) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // 1. Título
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Comprobante de Compra - GymWear", fontTitle);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // 2. Info de la Orden
            document.add(new Paragraph("Orden ID: " + order.getId()));
            document.add(new Paragraph("Estado: " + order.getStatus()));
            document.add(new Paragraph("Total: $" + order.getGrandTotal()));
            document.add(Chunk.NEWLINE);

            // 3. Tabla de Productos
            PdfPTable table = new PdfPTable(3); 
            table.setWidthPercentage(100);
            table.addCell("Producto ID");
            table.addCell("Cantidad");
            table.addCell("Precio Unitario");

            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    table.addCell(item.getProductVariantId().toString());
                    table.addCell(item.getQuantity().toString());
                    table.addCell("$" + item.getUnitPrice());
                }
            }
            document.add(table);

            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}