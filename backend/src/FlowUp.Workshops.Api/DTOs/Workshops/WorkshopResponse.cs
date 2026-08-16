using FlowUp.Workshops.Api.DTOs.Colaboradores;

namespace FlowUp.Workshops.Api.DTOs.Workshops;

public class WorkshopResponse
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public IReadOnlyCollection<ColaboradorResponse> Colaboradores { get; set; } = Array.Empty<ColaboradorResponse>();
}
