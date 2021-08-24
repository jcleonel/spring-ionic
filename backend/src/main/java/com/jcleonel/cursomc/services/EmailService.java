package com.jcleonel.cursomc.services;

import org.springframework.mail.SimpleMailMessage;

import com.jcleonel.cursomc.domain.Pedido;

public interface EmailService {
	
	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);

}
