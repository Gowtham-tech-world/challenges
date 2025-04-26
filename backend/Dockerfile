# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.3.8
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Set the working directory
WORKDIR /rails

# Install base system packages (includes dos2unix)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl libjemalloc2 libvips postgresql-client dos2unix && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# ---- BUILD STAGE ----
FROM base AS build

# Install packages required to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential git libpq-dev libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy and install Ruby gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap for app & lib
RUN bundle exec bootsnap precompile app/ lib/

# Adjust binfiles to be executable and Unix-compatible
RUN apt-get install -y dos2unix && \
    chmod +x bin/* && \
    dos2unix bin/* && \
    sed -i 's/ruby\.exe$/ruby/' bin/*

# ---- FINAL STAGE ----
FROM base

# Copy built gems and app from build stage
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Create non-root user and adjust file ownership
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# Entrypoint sets up the database
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Expose port 3000 for Rails server
EXPOSE 3000

# Start Rails server (production mode)
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "3000"]
