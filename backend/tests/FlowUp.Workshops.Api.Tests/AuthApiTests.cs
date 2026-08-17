using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using FlowUp.Workshops.Api.DTOs.Auth;
using FlowUp.Workshops.Api.DTOs.Colaboradores;
using FlowUp.Workshops.Api.DTOs.Workshops;

namespace FlowUp.Workshops.Api.Tests;

public class AuthApiTests
{
    [Fact]
    public async Task Login_ReturnsOkAndToken_WhenCredentialsAreValid()
    {
        using var factory = new CustomWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/Auth/login", new { usuario = "admin", senha = "admin123" });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var payload = await response.Content.ReadFromJsonAsync<LoginResponse>();

        Assert.NotNull(payload);
        Assert.False(string.IsNullOrWhiteSpace(payload!.Token));
    }

    [Fact]
    public async Task Workshops_WithoutToken_ReturnsUnauthorized()
    {
        using var factory = new CustomWebApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/Workshops");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Colaboradores_WithToken_ReturnsOkAndNonEmptyList()
    {
        using var factory = new CustomWebApplicationFactory();
        using var client = factory.CreateClient();

        var token = await LoginAsync(client);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await client.GetAsync("/api/Colaboradores");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var colaboradores = await response.Content.ReadFromJsonAsync<List<ColaboradorResponse>>();

        Assert.NotNull(colaboradores);
        Assert.NotEmpty(colaboradores!);
    }

    [Fact]
    public async Task WorkshopById_WithToken_ReturnsOkAndIncludesCollaborators()
    {
        using var factory = new CustomWebApplicationFactory();
        using var client = factory.CreateClient();

        var token = await LoginAsync(client);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await client.GetAsync("/api/Workshops/1");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var workshop = await response.Content.ReadFromJsonAsync<WorkshopResponse>();

        Assert.NotNull(workshop);
        Assert.Equal(1, workshop!.Id);
        Assert.NotNull(workshop.Colaboradores);
        Assert.NotEmpty(workshop.Colaboradores);
    }

    [Fact]
    public async Task DuplicateParticipation_ReturnsConflict()
    {
        using var factory = new CustomWebApplicationFactory();
        using var client = factory.CreateClient();

        var token = await LoginAsync(client);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await client.PostAsync("/api/Workshops/1/participantes/1", null);

        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
    }

    private static async Task<string> LoginAsync(HttpClient client)
    {
        var loginResponse = await client.PostAsJsonAsync("/api/Auth/login", new { usuario = "admin", senha = "admin123" });
        loginResponse.EnsureSuccessStatusCode();

        var payload = await loginResponse.Content.ReadFromJsonAsync<LoginResponse>();
        Assert.NotNull(payload);

        return payload!.Token;
    }
}
