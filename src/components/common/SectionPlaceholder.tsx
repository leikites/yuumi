import Container from "./Container";

type SectionPlaceholderProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

function SectionPlaceholder({ id, eyebrow, title, description }: SectionPlaceholderProps) {
  return (
    <section className="section-placeholder" id={id}>
      <Container>
        <div className="section-placeholder-inner">
          <div className="section-placeholder-meta">
            <span>{eyebrow}</span>
            <span>COMING NEXT</span>
          </div>

          <div className="section-placeholder-card">
            <h2 className="section-title">{title}</h2>
            <p className="section-copy">{description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SectionPlaceholder;
