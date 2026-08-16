export function getWorkshopsByCollaborator(colaboradores, workshops) {
  const participacoesPorColaborador = new Map();

  colaboradores.forEach((colaborador) => {
    participacoesPorColaborador.set(colaborador.id, {
      id: colaborador.id,
      nome: colaborador.nome,
      quantidade: 0,
    });
  });

  workshops.forEach((workshop) => {
    workshop.colaboradores.forEach((colaborador) => {
      const item = participacoesPorColaborador.get(colaborador.id);

      if (item) {
        item.quantidade += 1;
      }
    });
  });

  return colaboradores.map((colaborador) => {
    const item = participacoesPorColaborador.get(colaborador.id);
    return {
      id: colaborador.id,
      nome: colaborador.nome,
      quantidade: item ? item.quantidade : 0,
    };
  });
}

export function getParticipantsByWorkshop(workshops) {
  return workshops.map((workshop) => ({
    id: workshop.id,
    nome: workshop.nome,
    quantidade: workshop.colaboradores.length,
  }));
}
