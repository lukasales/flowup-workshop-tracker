namespace FlowUp.Workshops.Api.DTOs.Workshops;

public class CreateWorkshopRequest
{
    public string Nome { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
    public string Descricao { get; set; } = string.Empty;
}
