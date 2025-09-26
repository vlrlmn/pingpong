FROM nginx:stable

ARG DOMAIN FR_PORT GS_PORT MMRS_PORT UMS_PORT

RUN apt-get update && \
    apt-get install -y openssl

RUN mkdir -p /etc/nginx/ssl

RUN openssl req -x509 -nodes \
    -out /etc/nginx/ssl/ft_transcendence.crt \
    -keyout /etc/nginx/ssl/ft_transcendence.key \
    -subj "/C=AE/ST=AbuDhabi/L=AbuDhabi/O=42/OU=42/CN=${DOMAIN}/UID=sabdulki"

COPY /config/default.conf.template /etc/nginx/templates/default.conf.template
COPY /config/proxy-common.conf /etc/nginx/conf.d/proxy-common.conf
COPY /config/cors.conf /etc/nginx/conf.d/cors.conf
COPY /config/headers.conf /etc/nginx/conf.d/headers.conf
COPY /config/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]