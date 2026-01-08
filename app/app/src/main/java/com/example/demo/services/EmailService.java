package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(String to, Long orderId, String status) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // Configura quién envía el correo (aunque Gmail lo sobrescribe por seguridad)
        message.setFrom("tu_correo@gmail.com"); 
        message.setTo(to);
        message.setSubject("Confirmación de Orden #" + orderId + " - GymWear");
        message.setText("Hola,\n\n" +
                "Tu orden con ID " + orderId + " ha sido procesada exitosamente.\n" +
                "Estado actual: " + status + "\n\n" +
                "Gracias por tu compra.\n" +
                "Atte: El equipo de GymWear.");

        mailSender.send(message);
        System.out.println("Correo enviado exitosamente a: " + to);
    }
}

//EMAIL_HOST_USER = 'mapeorosa@gmail.com'

//EMAIL_HOST_PASSWORD = 'wsoy wuvy pwhp vuia' 