FROM php:8.2-apache

# Cài extension cho Laravel
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

# Copy toàn bộ code
COPY . .

# Cài composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install

# Cấp quyền storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
