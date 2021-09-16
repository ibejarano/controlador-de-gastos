import React from "react";

import TitleContainer from "../components/common/Title";
import TitleAndSubtitle from "../components/common/TitleAndSubtitle";

export default function HomePage() {
  return (
    <React.Fragment>
      <TitleContainer title="Proximamente" />
      <TitleAndSubtitle title="- Configuracion" subtitle="Cambio de nombre, Nuevas secciones, Agregar billeteras, cambiar nombre de billeteras" />
      <TitleAndSubtitle title="- Desktop Version" />
    </React.Fragment>
  );
}
