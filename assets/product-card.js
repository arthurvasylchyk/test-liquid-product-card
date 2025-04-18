if (!customElements.get('product-card')) {
  customElements.define(
    'product-card',
    class ProductCard extends HTMLElement {
      constructor() {
        super();
        this.initialize();
      }

      initialize() {
        const jsonData = JSON.parse(this.querySelector('script[id^="CardProductJSON"]').textContent);
        this.card_product = jsonData.card_product;
        this.metafields = jsonData.metafields;
        this.productLink = this.querySelector('a[href*="/products/"]');
        this.swatches = this.querySelectorAll('[data-swatch]');
        this.featuredImage = this.querySelector('[data-primary-image]');
        this.secondaryImage = this.querySelector('[data-secondary-image]');
        this.priceElement = this.querySelector('[data-price]');
        this.compareAtPriceElement = this.querySelector('[data-compare-at-price]');
        this.saleBadge = this.querySelector('[data-sale-badge]');

        this.attachEventListeners();
      }

      attachEventListeners() {
        this.swatches.forEach((swatch) => {
          swatch.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSwatchClick(swatch);
          });
        });
      }

      handleSwatchClick(swatch) {
        const variantId = swatch.dataset.variantId;
        const variant = this.card_product.variants.find((v) => v.id === parseInt(variantId));

        if (variant) {
          // Update featured image
          if (this.featuredImage) {
            const imageUrl = variant.featured_image?.src || variant.image?.src;
            if (imageUrl) {
              this.featuredImage.src = imageUrl;
            }
          }

          // Update secondary image
          if (this.secondaryImage) {
            const variantGallery = this.metafields.variant_gallery[variantId]?.value?.[0];
            if (variantGallery) {
              this.secondaryImage.src = variantGallery.src;
              this.secondaryImage.style.display = 'block';
            } else {
              this.secondaryImage.style.display = 'none';
            }
          }

          // Update active swatch state
          this.swatches.forEach((s) => {
            s.classList.remove('card-swatch--selected');
          });
          swatch.classList.add('card-swatch--selected');

          // Update price
          if (this.priceElement) {
            this.priceElement.textContent = this.formatPrice(variant.price);

            if (variant.compare_at_price && variant.compare_at_price > variant.price) {
              this.priceElement.classList.remove('text-gray-900');
              this.priceElement.classList.add('text-red-500');
            } else {
              this.priceElement.classList.remove('text-red-500');
              this.priceElement.classList.add('text-gray-900');
            }
          }

          // Update compare at price
          if (this.compareAtPriceElement) {
            if (variant.compare_at_price && variant.compare_at_price > variant.price) {
              this.compareAtPriceElement.textContent = this.formatPrice(variant.compare_at_price);
              this.compareAtPriceElement.style.display = 'inline';
            } else {
              this.compareAtPriceElement.style.display = 'none';
            }
          }

          // Update sale badge
          if (this.saleBadge) {
            if (variant.compare_at_price && variant.compare_at_price > variant.price) {
              this.saleBadge.style.display = 'block';
            } else {
              this.saleBadge.style.display = 'none';
            }
          }

          // Update product link with variant
          if (this.productLink) {
            const baseUrl = this.productLink.href.split('?')[0];
            this.productLink.href = `${baseUrl}?variant=${variantId}`;
          }
        }
      }

      formatPrice(price) {
        return new Intl.NumberFormat(Shopify.locale, {
          style: 'currency',
          currency: Shopify.currency.active,
        }).format(price / 100);
      }
    },
  );
}
