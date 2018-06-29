CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE "Projects" ADD COLUMN tsv tsvector;
CREATE INDEX tsv_idx ON "Projects" USING gin(tsv);
UPDATE "Projects" SET tsv = setweight(to_tsvector(coalesce(full_text,'')), 'A');

CREATE FUNCTION projects_search_trigger() RETURNS trigger AS $$
begin
  new.tsv :=
    setweight(to_tsvector(coalesce(new.full_text,'')), 'A');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON "Projects" FOR EACH ROW EXECUTE PROCEDURE projects_search_trigger();
