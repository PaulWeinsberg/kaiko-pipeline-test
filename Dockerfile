FROM nginx:1.25.4

COPY .nginx/nginx.conf.template /etc/nginx/nginx.conf.template

RUN rm -rf /usr/share/nginx/html/*

ENTRYPOINT sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"