FROM node:14-alpine AS builder

COPY ./ /root/edgeview/
WORKDIR /root/edgeview
RUN yarn config set registry https://registry.npm.taobao.org/ \
  && yarn config set network-timeout 300000 \
  && yarn install \
  && yarn run build

# Step2. Put into nginx
FROM nginx:1.21.1-alpine

ARG REPO_URL
ARG BRANCH
ARG COMMIT_REF
LABEL repo-url=$REPO_URL
LABEL branch=$BRANCH
LABEL commit-ref=$COMMIT_REF

RUN mkdir /etc/nginx/edgeview

COPY --from=builder /root/edgeview/dist /var/www/edgeview
COPY ./deploy/init_env.sh /init_env.sh
WORKDIR /
CMD ["sh", "init_env.sh"]
