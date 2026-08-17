using System.Collections.Generic;
using System.IO;
using FlowUp.Workshops.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace FlowUp.Workshops.Api.Tests;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly string _databasePath = Path.Combine(
        Path.GetTempPath(),
        $"flowup-tests-{Guid.NewGuid():N}.db");

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");

        builder.ConfigureAppConfiguration((_, configBuilder) =>
        {
            var inMemorySettings = new Dictionary<string, string?>
            {
                ["DatabaseProvider"] = "Sqlite",
                ["ConnectionStrings:DefaultConnection"] = $"Data Source={_databasePath}",
                ["Jwt:Issuer"] = "FlowUp.Workshops",
                ["Jwt:Audience"] = "FlowUp.Workshops",
                ["Jwt:Key"] = "test-key-flowup-workshops-1234567890",
                ["Jwt:ExpirationMinutes"] = "60",
                ["Auth:Username"] = "admin",
                ["Auth:Password"] = "admin123"
            };

            configBuilder.AddInMemoryCollection(inMemorySettings);
        });

        builder.ConfigureServices(services =>
        {
            services.RemoveAll<DbContextOptions<AppDbContext>>();
            services.RemoveAll<AppDbContext>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite($"Data Source={_databasePath}"));

            var serviceProvider = services.BuildServiceProvider();

            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            DatabaseSeeder.SeedAsync(scope.ServiceProvider).GetAwaiter().GetResult();
        });
    }
}
