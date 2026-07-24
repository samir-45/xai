"use client";

import { IngestDiagram } from "./IngestDiagram";
import { AnalyzeDiagram } from "./AnalyzeDiagram";
import { GenerateDiagram } from "./GenerateDiagram";

export function StageDiagram({ id }: { id: string }) {
  if (id === "ingest") return <IngestDiagram />;
  if (id === "analyze") return <AnalyzeDiagram />;
  return <GenerateDiagram />;
}
