package org.ENSAJ.ClientService;

import org.ENSAJ.ClientService.config.MQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {
    @RabbitListener(queues = MQConfig.QUEUE)
    public void showMessage(String message){
        System.out.println("Le client id est "+message);
    }
}
