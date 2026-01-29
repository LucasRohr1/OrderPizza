import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-hero">
        <div className="index-hero-content">
          <h2 className="index-tagline">🍕 Pizza & Art at a location near you</h2>
          <p className="index-description">
            Experience authentic Italian pizza crafted with love and the finest ingredients.
            Every slice tells a story.
          </p>
        </div>
      </div>
      
      <div className="index-actions">
        <Link to="/order" className="index-action-card order-card">
          <div className="action-icon">🍕</div>
          <h3>Order Now</h3>
          <p>Browse our menu and create your perfect pizza</p>
        </Link>
        
        <Link to="/past" className="index-action-card history-card">
          <div className="action-icon">📋</div>
          <h3>Past Orders</h3>
          <p>View your order history and reorder favorites</p>
        </Link>
      </div>
    </div>
  );
}
