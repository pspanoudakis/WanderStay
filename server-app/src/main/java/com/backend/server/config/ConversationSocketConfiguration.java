package com.backend.server.config;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.backend.server.config.jwt.JwtService;
import com.backend.server.services.ConversationService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class ConversationSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    public static final String CHAT_BROKER_PREFIX = "/conversation/ws/";

    private final ConversationService conversationService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(CHAT_BROKER_PREFIX);
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
            .addEndpoint("/ws-message")
            .setAllowedOriginPatterns("*");
    }

    @Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(new ChannelInterceptor() {
			@Override
            @Nullable
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
					MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
				if (accessor != null && StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
                    var tokenHeaderList = accessor.getNativeHeader("login");
                    UserDetails userDetails;
                    try {
                        final String jwt = tokenHeaderList.get(0);
                        userDetails = userDetailsService.loadUserByUsername(
                            jwtService.findUsername(jwt)
                        );
                    } catch (RuntimeException e) {
                        throw new RuntimeException("Socket subscription cannot be authenticated.");
                    }                    
                    var destinationHeaderList = accessor.getNativeHeader("destination");
                    try {
                        final String destination = destinationHeaderList.get(0);
                        Matcher matcher = Pattern.compile(CHAT_BROKER_PREFIX + "(\\d+)").matcher(destination);
                        if (matcher.find()) {
                            conversationService.ensureRelatedOrElseThrow(
                                userDetails.getUsername(), 
                                Long.parseLong(matcher.group(1))
                            );
                        }
                    } catch (RuntimeException e) {
                        throw new RuntimeException("Socket subscription cannot be authorized.");
                    }
                }
				return message;
            }
		});
	}

}
