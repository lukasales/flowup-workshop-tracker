using FlowUp.Workshops.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var databaseProvider = builder.Configuration["DatabaseProvider"];

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var provider = databaseProvider ?? "Sqlite";

    if (provider == "SqlServer")
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        return;
    }

    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    await DatabaseSeeder.SeedAsync(app.Services);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
