import React from "react";
import { Link } from "react-router-dom";
// Use the Figma asset as a placeholder for the breadcrumb background
const breadcrumbBg = "http://localhost:3845/assets/ff11f922957789c5aab0e9c3044b2d19e3b6c761.png";

export default function BreadcrumbHeader({ pageTitle }: { pageTitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1440,
        height: 400,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        margin: "0 auto",
        overflow: "hidden",
      }}
      data-node-id="4305:381"
      data-name="breadcrumb"
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "#2a2a91" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url('${breadcrumbBg}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            backgroundSize: "475.2px 558px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(42, 42, 145, 0) 59.286%, rgb(42, 42, 145) 108.1%), linear-gradient(rgb(42, 42, 145) 28.214%, rgba(42, 42, 145, 0) 65.476%)",
          }}
        />
      </div>
      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
        }}
        data-node-id="4306:384"
      >
        <div
          style={{
            fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize: 60,
            color: "#fff",
            textAlign: "center",
            letterSpacing: "-1.8px",
            marginBottom: 0,
            lineHeight: 1.3,
          }}
          data-node-id="4305:382"
        >
          <p style={{ margin: 0 }}>{pageTitle}</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            lineHeight: 1.3,
          }}
          data-node-id="4306:385"
        >
          <span
            style={{
              fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "-0.48px",
            }}
            data-node-id="4305:383"
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          </span>
          <span
            style={{
              fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: 0,
            }}
            data-node-id="4306:386"
          >
            /
          </span>
          <span
            style={{
              fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.48px",
            }}
            data-node-id="4306:387"
          >
            {pageTitle}
          </span>
        </div>
      </div>
    </div>
  );
}
