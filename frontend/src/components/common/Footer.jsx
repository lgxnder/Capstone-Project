export default function Footer() {
  return (
    <footer className="app-footer">
      <style>{`
        .app-footer {
          width: 100vw;
          margin-left: calc(50% - 50vw);

          padding: 12px 20px;

          display: flex;
          justify-content: center;

          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);

          background: transparent;
        }

        .footer-text {
          max-width: 900px;
          text-align: center;
          line-height: 1.5;
        }
      `}</style>

      <div className="footer-text">
        Care Compass is not a licensed therapist or medical professional.  
        If you are in immediate danger, please contact local emergency services.
      </div>
    </footer>
  );
}