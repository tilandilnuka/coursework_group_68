"use client";

import { allProducts, searchProducts } from "@/actions/product";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import ModernToast from "@/components/ModernToast";
import ProductCard from "@/components/ProductCard";
import WowHero from "@/components/WowHero";
import Categories from "@/components/Categories";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LiveChat from "@/components/LiveChat";
import { brands, popularSearches, storefrontCategories } from "@/constants";

export default function Home({ searchParams }) {
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
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const initialSet = () => {
    setAllData(data);
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
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

  async function handleSearchSubmit() {
    await searchProducts({ search: search })
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setAlert({
              ...alert,
              loading: false,
              message: data.message,
              error: false,
              success: true,
            });
            window.setTimeout(() => {
              resetAlert();
            }, 1000);
          } else {
            setAllData(data.data);
            setShow(false);
          }
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
        console.log(allData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSubmit(e, options = {}) {
    const { skipLoading = false } = options;
    if (e) {
      e.preventDefault();
    }
    let params;
    if (!skipLoading) {
      setAlert({ ...alert, loading: true, message: "Loading..." });
    }
    params = { limit, page };
    if (filterValues?.brand) params.brand = filterValues.brand;
    if (filterValues?.category) params.category = filterValues.category;
    if (filterValues?.price) params.price = filterValues.price;
    if (filterValues?.sort) params.sort = filterValues.sort;
    let token = getCookie("token_user");

    await allProducts(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setAllData(data.doc);
          } else {
            setAllData(data.doc);
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            setTotalPages(Math.ceil(totalCount / limit));
            setShow(false);
          }
          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  }

  useEffect(() => {
    queueMicrotask(() => {
      if (search.length == 0) {
        handleSubmit(undefined, { skipLoading: true });
      } else {
        handleSearchSubmit();
      }
    });
  }, [search]);

  useEffect(() => {
    console.log("page changed...", page);
    queueMicrotask(() => {
      handleSubmit();
    });
  }, [page, filterValues]);

  const resetFilter = () => {
    setFilterValues({ category: "", brand: "", price: "", sort: "" });
  };

  console.log(allData, "is there data...");

  return (
    <main
      className="overflow-hidden min-h-screen"
      style={{ background: "#0d0d0c" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

        :root {
          --copper: #c8601a;
          --copper-light: #e07c35;
          --copper-muted: rgba(200,96,26,0.12);
          --copper-border: rgba(200,96,26,0.22);
          --graphite: #111110;
          --graphite-card: #1c1b19;
          --ivory: #f5f3ef;
          --ivory-deep: #ede9e3;
          --ivory-border: rgba(0,0,0,0.08);
          --text-primary: #1a1916;
          --text-muted: #6b6660;
          --text-faint: #9c9690;
          --shadow-card: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          --shadow-elevated: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          --radius-input: 10px;
          --radius-card: 16px;
          --radius-panel: 20px;
        }

        .pg-section-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: var(--copper-muted);
          border: 1px solid var(--copper-border);
          border-radius: 100px;
          color: var(--copper);
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pg-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
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

        .pg-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--copper), var(--copper-light));
          border-radius: 2px;
        }

        /* ── Inputs & Selects ── */
        .pg-input {
          width: 100%;
          padding: 13px 16px 13px 48px;
          background: var(--ivory);
          border: 1.5px solid var(--ivory-border);
          border-radius: var(--radius-input);
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
          box-shadow: 0 0 0 3px rgba(200,96,26,0.10);
        }

        .pg-select {
          width: 100%;
          padding: 12px 40px 12px 14px;
          background: var(--ivory);
          border: 1.5px solid var(--ivory-border);
          border-radius: var(--radius-input);
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
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
          box-shadow: 0 0 0 3px rgba(200,96,26,0.10);
        }

        /* ── Buttons ── */
        .pg-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%);
          color: #fff;
          border: none;
          border-radius: var(--radius-input);
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .pg-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .pg-btn-primary:active { transform: translateY(0); }

        .pg-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: transparent;
          color: var(--copper);
          border: 1.5px solid var(--copper-border);
          border-radius: var(--radius-input);
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .pg-btn-outline:hover {
          background: var(--copper-muted);
          border-color: var(--copper);
          transform: translateY(-1px);
        }

        /* ── Chips ── */
        .pg-chip {
          display: inline-flex;
          align-items: center;
          padding: 5px 14px;
          border: 1.5px solid var(--ivory-border);
          border-radius: 100px;
          background: var(--ivory);
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
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

        /* ── Pagination buttons ── */
        .pg-page-btn {
          min-width: 40px;
          height: 40px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.10);
          background: var(--ivory);
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: border-color 0.18s, color 0.18s, background 0.18s, transform 0.15s;
        }
        .pg-page-btn:hover {
          border-color: var(--copper);
          color: var(--copper);
          transform: translateY(-1px);
        }
        .pg-page-btn.active {
          background: linear-gradient(135deg, var(--copper) 0%, var(--copper-light) 100%);
          border-color: transparent;
          color: #fff;
        }
        .pg-page-btn.active:hover { transform: translateY(-1px); opacity: 0.92; }

        .pg-page-nav {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.10);
          background: var(--ivory);
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: border-color 0.18s, color 0.18s, transform 0.15s;
        }
        .pg-page-nav:hover {
          border-color: var(--copper);
          color: var(--copper);
          transform: translateY(-1px);
        }

        /* ── Filter label ── */
        .pg-filter-label {
          display: block;
          font-family: 'Manrope', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        /* ── Product grid stagger ── */
        .pg-product-item { opacity: 0; animation: pgFadeUp 0.5s ease-out forwards; }
        @keyframes pgFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive tweaks ── */
        @media (max-width: 640px) {
          .pg-filter-grid { grid-template-columns: 1fr 1fr !important; }
          .pg-filters-row { flex-direction: column !important; gap: 12px !important; }
        }
        @media (max-width: 400px) {
          .pg-filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}

      <WowHero />
      <TrustBadges />
      <Categories />

      <div
        id="discover"
        className="padding-x max-width"
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "#faf9f7",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-elevated)",
            padding: "32px",
            marginBottom: "56px",
          }}
        >
          <div style={{ position: "relative", marginBottom: "28px" }}>
            <div
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="18"
                height="18"
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
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontSize: "0.95rem",
              }}
              value={search}
              onChange={handleSearch("search")}
              aria-label="Search products"
            />
          </div>

          <div
            className="pg-filters-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--copper)",
                  flexShrink: 0,
                }}
              />
              <span
                className="pg-body"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Filters
              </span>
            </div>

            <button
              className="pg-btn-outline"
              onClick={resetFilter}
              aria-label="Reset all filters"
              style={{ padding: "9px 18px" }}
            >
              <svg
                width="14"
                height="14"
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

          <div
            className="pg-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            <div>
              <label className="pg-filter-label" htmlFor="filter-category">
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
              <label className="pg-filter-label" htmlFor="filter-brand">
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
              <label className="pg-filter-label" htmlFor="filter-price">
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
              <label className="pg-filter-label" htmlFor="filter-sort">
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
            <div style={{ marginBottom: "40px" }}>
              <span
                className="pg-section-label"
                style={{ marginBottom: "16px", display: "inline-flex" }}
              >
                Collection
              </span>
              <h2
                className="pg-heading"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--text-primary)",
                  marginTop: "12px",
                  marginBottom: "10px",
                }}
              >
                Our <span className="pg-copper-text">Products</span>
              </h2>
              <div className="pg-divider" style={{ marginBottom: "10px" }} />
              <p
                className="pg-body"
                style={{
                  fontSize: "0.97rem",
                  color: "var(--text-muted)",
                  maxWidth: "480px",
                  lineHeight: 1.65,
                }}
              >
                Premium mobile devices and accessories, curated for everyday
                performance and style.
              </p>
            </div>

            <div className="home__cars-wrapper">
              {allData?.map((product, index) => (
                <div
                  key={product._id || index}
                  className="pg-product-item"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px 0",
            }}
          >
            <div
              style={{
                maxWidth: "520px",
                width: "100%",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "20px",
                boxShadow: "var(--shadow-card)",
                padding: "48px 40px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "16px",
                  background: "var(--ivory)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <svg
                  width="32"
                  height="32"
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
                  fontSize: "1.4rem",
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
                  marginBottom: "28px",
                }}
              >
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "32px",
                }}
              >
                <button onClick={resetFilter} className="pg-btn-primary">
                  <svg
                    width="14"
                    height="14"
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
                <a
                  href="/categories"
                  className="pg-btn-outline"
                  style={{ textDecoration: "none" }}
                >
                  <svg
                    width="14"
                    height="14"
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

              <div
                style={{
                  background: "var(--ivory)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  textAlign: "left",
                  marginBottom: "24px",
                }}
              >
                <p
                  className="pg-body"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                  }}
                >
                  Search Tips
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {[
                    "Try keywords like 'iPhone' or 'Galaxy'",
                    "Check your spelling",
                    "Use brand names (Apple, Samsung…)",
                    "Remove some filters",
                  ].map((tip, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--copper)",
                          flexShrink: 0,
                          marginTop: "7px",
                        }}
                      />
                      <span
                        className="pg-body"
                        style={{
                          fontSize: "0.83rem",
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

              <div>
                <p
                  className="pg-body"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-faint)",
                    marginBottom: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Popular Searches
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
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
          </div>
        )}
      </div>

      <div
        aria-label="Page navigation"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 24px 72px",
          background: "#faf9f7",
        }}
      >
        <nav
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
          role="navigation"
          aria-label="Pagination"
        >
          <button
            onClick={prevPage}
            className="pg-page-nav"
            aria-label="Previous page"
          >
            <svg
              width="16"
              height="16"
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

          <button
            onClick={nextPage}
            className="pg-page-nav"
            aria-label="Next page"
          >
            Next
            <svg
              width="16"
              height="16"
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

      <Testimonials />
      <FAQ />
      <LiveChat />
    </main>
  );
}
