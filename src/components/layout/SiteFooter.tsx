import Container from "../common/Container";
import { siteMeta } from "../../data/site";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer-inner">
          <p>
            {siteMeta.name} / {siteMeta.title}
          </p>
          <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
        </div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
