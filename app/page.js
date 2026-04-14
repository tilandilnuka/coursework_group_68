"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import WowHero from "@/components/WowHero";
import Categories from "@/components/Categories";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LiveChat from "@/components/LiveChat";
import { brands, popularSearches, storefrontCategories } from "@/constants";
import { queryProductCatalog } from "@/data/productCatalog";

export default function Home() {
  const limit = 12;
  const [filterValues, setFilterValues] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const { search } = searchValues;
  const { category, brand, price, sort } = filterValues;
  const [page, setPage] = useState(1);
  const { products: allData, totalPages } = useMemo(
    () =>
      queryProductCatalog({
        search,
        category,
        brand,
        price,
        sort,
        limit,
        page,
      }),
    [search, category, brand, price, sort, page],
  );

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setPage(1);
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
    setPage(1);
    setSearchValues({ ...searchValues, [name]: e.target.value });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  const resetFilter = () => {
    setPage(1);
    setFilterValues({ category: "", brand: "", price: "", sort: "" });
  };

  return (
    <main
      className="overflow-hidden min-h-screen"
      style={{ background: "#080808" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

        /* ── Design tokens ── */
        :root {
          /* Brand */
          --copper: #c8601a;
          --copper-light: #e07c35;
          --copper-muted: rgba(200,96,26,0.10);
          --copper-border: rgba(200,96,26,0.20);

          /* Dark surface (hero / categories / testimonials / FAQ) */
          --dark-base: #080808;
          --dark-card: rgba(255,255,255,0.04);
          --dark-border: rgba(255,255,255,0.08);

          /* Light surface (trust badges / catalog) */
          --light-base: #f7f6f3;
          --light-surface: #ffffff;
          --light-border: rgba(0,0,0,0.07);

          /* Text on light */
          --text-primary: #1a1916;
          --text-muted:   #6b6660;
          --text-faint:   #9c9690;

          /* Shadows */
          --shadow-card:     0 2px 14px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          --shadow-elevated: 0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05);

          /* Shape */
          --radius-sm:   8px;
          --radius-md:  12px;
          --radius-lg:  18px;
          --radius-xl:  24px;

          /* Spacing scale */
          --section-gap:   96px;   /* between major sections on light surface */
          --inner-gap:     56px;   /* between header & content inside a section */
        }

        /* ── Typography helpers ── */
        .pg-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.1;
        }
        .pg-body {
          font-family: 'Manrope', sans-serif;
        }
        .pg-copper-text {
          background: linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Section label pill ── */
        .pg-section-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 13px;
          background: var(--copper-muted);
          border: 1px solid var(--copper-border);
          border-radius: 100px;
          color: var(--copper);
          font-family: 'Manrope', sans-serif;
          font-size: 0.70rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        /* ── Accent divider ── */
        .pg-divider {
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, var(--copper), var(--copper-light));
          border-radius: 2px;
        }

        .catalog-section {
          background: var(--light-base);
        }

        .catalog-section__inner {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          margin: 0 auto;
          padding: 80px 64px 80px;
        }

        @media (max-width: 1024px) {
          .catalog-section__inner { padding: 72px 40px; }
        }
        @media (max-width: 640px) {
          .catalog-section__inner { padding: 64px 20px; }
        }

        /* ── Filter bar ── */
        .filter-card {
          background: var(--light-surface);
          border: 1px solid var(--light-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-elevated);
          padding: 28px 32px;
          margin-bottom: var(--inner-gap);
        }

        /* ── Inputs & selects ── */
        .pg-input {
          width: 100%;
          padding: 13px 16px 13px 46px;
          background: var(--light-base);
          border: 1.5px solid var(--light-border);
          border-radius: var(--radius-md);
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pg-input::placeholder { color: var(--text-faint); }
        .pg-input:focus {
          border-color: var(--copper);
          box-shadow: 0 0 0 3px rgba(200,96,26,0.09);
        }

        .pg-select {
          width: 100%;
          padding: 11px 38px 11px 14px;
          background: var(--light-base);
          border: 1.5px solid var(--light-border);
          border-radius: var(--radius-md);
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          outline: none;
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b6660' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pg-select:focus {
          border-color: var(--copper);
          box-shadow: 0 0 0 3px rgba(200,96,26,0.09);
        }

        /* ── Filter row layout ── */
        .filter-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 12px;
        }
        .filter-controls__label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .filter-controls__dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--copper);
          flex-shrink: 0;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .filter-grid__label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 7px;
        }
        @media (max-width: 860px)  { .filter-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 460px)  { .filter-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px)  { .filter-controls { flex-direction: column; align-items: flex-start; } }

        /* ── Buttons ── */
        .pg-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          background: linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.01em;
          text-decoration: none;
        }
        .pg-btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200,96,26,0.28);
        }
        .pg-btn-primary:active { transform: translateY(0); }

        .pg-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          background: transparent;
          color: var(--copper);
          border: 1.5px solid var(--copper-border);
          border-radius: var(--radius-md);
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
          text-decoration: none;
        }
        .pg-btn-ghost:hover {
          background: var(--copper-muted);
          border-color: var(--copper);
          transform: translateY(-1px);
        }

        /* ── Chips for popular search ── */
        .pg-chip {
          display: inline-flex;
          align-items: center;
          padding: 5px 13px;
          border: 1.5px solid var(--light-border);
          border-radius: 100px;
          background: var(--light-base);
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .pg-chip:hover {
          border-color: var(--copper);
          color: var(--copper);
          background: var(--copper-muted);
        }

        /* ── Collection header ── */
        .collection-header {
          margin-bottom: 44px;
        }
        .collection-header h2 {
          margin-top: 14px;
          margin-bottom: 12px;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          color: var(--text-primary);
        }
        .collection-header p {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 460px;
          line-height: 1.65;
        }

        /* ── Product grid stagger ── */
        .pg-product-item {
          opacity: 0;
          animation: pgFadeUp 0.45s ease-out forwards;
        }
        @keyframes pgFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Empty state card ── */
        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 48px 0 16px;
        }
        .empty-state__card {
          max-width: 500px;
          width: 100%;
          background: var(--light-surface);
          border: 1px solid var(--light-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-card);
          padding: 48px 40px;
          text-align: center;
        }
        .empty-state__icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: var(--radius-lg);
          background: var(--light-base);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
        }
        .empty-state__tips {
          background: var(--light-base);
          border-radius: var(--radius-lg);
          padding: 18px 22px;
          text-align: left;
          margin-bottom: 22px;
        }
        .empty-state__tips-title {
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .empty-state__tips-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .empty-state__tip-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .empty-state__tip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--copper);
          flex-shrink: 0;
          margin-top: 7px;
        }
        .empty-state__actions {
          display: flex;
          gap: 11px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .empty-state__searches {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          justify-content: center;
        }
        .empty-state__searches-label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          color: var(--text-faint);
          margin-bottom: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        @media (max-width: 460px) {
          .empty-state__card { padding: 32px 20px; }
          .empty-state__tips-grid { grid-template-columns: 1fr; }
        }

        /* ── Pagination ── */
        .pagination-wrap {
          display: flex;
          justify-content: center;
          padding: 40px 0 72px;
          background: var(--light-base);
        }
        .pagination-nav {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px;
          background: var(--light-surface);
          border: 1px solid var(--light-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
        }
        .pg-page-btn {
          min-width: 38px;
          height: 38px;
          padding: 0 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: background 0.18s, color 0.18s, transform 0.15s;
        }
        .pg-page-btn:hover {
          background: var(--light-base);
          color: var(--text-primary);
        }
        .pg-page-btn.active {
          background: linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%);
          color: #fff;
          box-shadow: 0 3px 10px rgba(200,96,26,0.30);
        }
        .pg-page-btn.active:hover { opacity: 0.92; transform: translateY(-1px); }
        .pg-page-nav {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 14px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: transparent;
          border: none;
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: background 0.18s, color 0.18s, transform 0.15s;
        }
        .pg-page-nav:hover {
          background: var(--light-base);
          color: var(--copper);
        }
        .pg-page-sep {
          height: 1px;
          width: 1px;
          background: var(--light-border);
          margin: 0 2px;
          align-self: stretch;
          width: 1px;
          height: 24px;
          align-self: center;
          background: var(--light-border);
        }
      `}</style>

      <WowHero />

      <TrustBadges />

      <Categories />

      <div id="discover" className="catalog-section">
        <div className="catalog-section__inner">
          <div className="filter-card">
            <div style={{ position: "relative", marginBottom: "22px" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9690"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for phones, tablets, and accessories…"
                className="pg-input"
                value={search}
                onChange={handleSearch("search")}
                aria-label="Search products"
              />
            </div>

            <div className="filter-controls">
              <span className="filter-controls__label">
                <span className="filter-controls__dot" />
                Filters
              </span>
              <button
                className="pg-btn-ghost"
                onClick={resetFilter}
                aria-label="Reset all filters"
                style={{ padding: "8px 16px" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
            </div>

            <div className="filter-grid">
              <div>
                <label className="filter-grid__label" htmlFor="filter-category">
                  Category
                </label>
                <select
                  id="filter-category"
                  className="pg-select"
                  value={category}
                  onChange={handleChange("category")}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {storefrontCategories.map((item) => (
                    <option value={item.name} key={item.name}>
                      {item.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-grid__label" htmlFor="filter-brand">
                  Brand
                </label>
                <select
                  id="filter-brand"
                  className="pg-select"
                  value={brand}
                  onChange={handleChange("brand")}
                  aria-label="Filter by brand"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand, index) => (
                    <option value={brand} key={index} className="capitalize">
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-grid__label" htmlFor="filter-price">
                  Price Range
                </label>
                <select
                  id="filter-price"
                  className="pg-select"
                  value={price}
                  onChange={handleChange("price")}
                  aria-label="Filter by price range"
                >
                  <option value="">Any Price</option>
                  <option value="50000">Under Rs. 50,000</option>
                  <option value="100000">Under Rs. 100,000</option>
                  <option value="200000">Under Rs. 200,000</option>
                  <option value="500000">Under Rs. 500,000</option>
                </select>
              </div>

              <div>
                <label className="filter-grid__label" htmlFor="filter-sort">
                  Sort By
                </label>
                <select
                  id="filter-sort"
                  className="pg-select"
                  value={sort}
                  onChange={handleChange("sort")}
                  aria-label="Sort products"
                >
                  <option value="">Default Order</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {allData && allData.length > 0 ? (
            <section>
              <div className="collection-header">
                <span className="pg-section-label">Collection</span>
                <h2 className="pg-heading">
                  Our <span className="pg-copper-text">Products</span>
                </h2>
                <div className="pg-divider" style={{ marginBottom: "12px" }} />
                <p className="pg-body">
                  Premium mobile devices and accessories, curated for everyday
                  performance and style.
                </p>
              </div>

              <div className="home__cars-wrapper">
                {allData?.map((product, index) => (
                  <div
                    key={product._id || index}
                    className="pg-product-item"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="empty-state">
              <div className="empty-state__card">
                <div className="empty-state__icon-wrap">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9c9690"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>

                <h2
                  className="pg-heading"
                  style={{
                    fontSize: "1.35rem",
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                  }}
                >
                  {search ? `No results for "${search}"` : "No Products Found"}
                </h2>
                <p
                  className="pg-body"
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                    marginBottom: "26px",
                  }}
                >
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>

                <div className="empty-state__actions">
                  <button onClick={resetFilter} className="pg-btn-primary">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                    Clear Filters
                  </button>
                  <a href="/categories" className="pg-btn-ghost">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Browse Categories
                  </a>
                </div>

                <div className="empty-state__tips">
                  <p className="empty-state__tips-title">Search Tips</p>
                  <div className="empty-state__tips-grid">
                    {[
                      "Try keywords like 'iPhone' or 'Galaxy'",
                      "Check your spelling",
                      "Use brand names (Apple, Samsung…)",
                      "Remove some filters",
                    ].map((tip, index) => (
                      <div key={index} className="empty-state__tip-item">
                        <span className="empty-state__tip-dot" />
                        <span
                          className="pg-body"
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="empty-state__searches-label">
                  Popular Searches
                </span>
                <div className="empty-state__searches">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchValues({ search: term })}
                      className="pg-chip"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrap" aria-label="Page navigation">
          <nav
            className="pagination-nav"
            role="navigation"
            aria-label="Pagination"
          >
            <button
              onClick={prevPage}
              className="pg-page-nav"
              aria-label="Previous page"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Prev
            </button>
            <span className="pg-page-sep" aria-hidden="true" />

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`pg-page-btn${page === index + 1 ? " active" : ""}`}
                aria-label={`Go to page ${index + 1}`}
                aria-current={page === index + 1 ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}

            <span className="pg-page-sep" aria-hidden="true" />
            <button
              onClick={nextPage}
              className="pg-page-nav"
              aria-label="Next page"
            >
              Next
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </nav>
        </div>
      )}

      <Testimonials />
      <FAQ />
      <LiveChat />
    </main>
  );
}
