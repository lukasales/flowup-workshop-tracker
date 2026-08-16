using FlowUp.Workshops.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FlowUp.Workshops.Api.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Database.EnsureCreatedAsync();

        if (await context.Colaboradores.AnyAsync())
        {
            return;
        }

        var colaboradores = new[]
        {
            new Colaborador { Nome = "Ana Silva" },
            new Colaborador { Nome = "Bruno Costa" },
            new Colaborador { Nome = "Carla Souza" },
            new Colaborador { Nome = "Daniel Lima" },
            new Colaborador { Nome = "Elisa Martins" },
            new Colaborador { Nome = "Felipe Rocha" },
            new Colaborador { Nome = "Gabriela Alves" },
            new Colaborador { Nome = "Henrique Santos" }
        };

        context.Colaboradores.AddRange(colaboradores);

        var workshops = new[]
        {
            new Workshop
            {
                Nome = "Clean Code na Prática",
                DataRealizacao = new DateTime(2026, 1, 15, 16, 0, 0),
                Descricao = "Boas práticas para criação de código legível e de fácil manutenção."
            },
            new Workshop
            {
                Nome = "APIs REST com ASP.NET Core",
                DataRealizacao = new DateTime(2026, 4, 16, 16, 0, 0),
                Descricao = "Conceitos e práticas para desenvolvimento de APIs REST com ASP.NET Core."
            },
            new Workshop
            {
                Nome = "Testes Automatizados em Aplicações Web",
                DataRealizacao = new DateTime(2026, 7, 16, 16, 0, 0),
                Descricao = "Introdução a estratégias de testes automatizados para aplicações web."
            },
            new Workshop
            {
                Nome = "Git e Code Review",
                DataRealizacao = new DateTime(2026, 10, 15, 16, 0, 0),
                Descricao = "Boas práticas de versionamento, colaboração e revisão de código."
            }
        };

        context.Workshops.AddRange(workshops);
        await context.SaveChangesAsync();

        var colaboradorMap = colaboradores.ToDictionary(c => c.Nome);
        var workshopMap = workshops.ToDictionary(w => w.Nome);

        var participacoes = new List<Participacao>
        {
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Ana Silva"] },
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Bruno Costa"] },
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Carla Souza"] },
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Daniel Lima"] },
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Elisa Martins"] },
            new() { Workshop = workshopMap["Clean Code na Prática"], Colaborador = colaboradorMap["Felipe Rocha"] },

            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Ana Silva"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Bruno Costa"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Carla Souza"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Daniel Lima"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Elisa Martins"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Gabriela Alves"] },
            new() { Workshop = workshopMap["APIs REST com ASP.NET Core"], Colaborador = colaboradorMap["Henrique Santos"] },

            new() { Workshop = workshopMap["Testes Automatizados em Aplicações Web"], Colaborador = colaboradorMap["Ana Silva"] },
            new() { Workshop = workshopMap["Testes Automatizados em Aplicações Web"], Colaborador = colaboradorMap["Bruno Costa"] },
            new() { Workshop = workshopMap["Testes Automatizados em Aplicações Web"], Colaborador = colaboradorMap["Daniel Lima"] },
            new() { Workshop = workshopMap["Testes Automatizados em Aplicações Web"], Colaborador = colaboradorMap["Felipe Rocha"] },
            new() { Workshop = workshopMap["Testes Automatizados em Aplicações Web"], Colaborador = colaboradorMap["Henrique Santos"] },

            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Ana Silva"] },
            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Carla Souza"] },
            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Daniel Lima"] },
            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Elisa Martins"] },
            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Gabriela Alves"] },
            new() { Workshop = workshopMap["Git e Code Review"], Colaborador = colaboradorMap["Henrique Santos"] }
        };

        context.Participacoes.AddRange(participacoes);
        await context.SaveChangesAsync();
    }
}
