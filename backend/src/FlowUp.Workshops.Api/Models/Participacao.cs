namespace FlowUp.Workshops.Api.Models;

public class Participacao
{
    public int WorkshopId { get; set; }
    public Workshop Workshop { get; set; } = null!;
    public int ColaboradorId { get; set; }
    public Colaborador Colaborador { get; set; } = null!;
}
