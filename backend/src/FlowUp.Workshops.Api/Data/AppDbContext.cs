using FlowUp.Workshops.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FlowUp.Workshops.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Colaborador> Colaboradores { get; set; }
    public DbSet<Workshop> Workshops { get; set; }
    public DbSet<Participacao> Participacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Participacao>()
            .HasKey(p => new { p.WorkshopId, p.ColaboradorId });

        modelBuilder.Entity<Participacao>()
            .HasOne(p => p.Workshop)
            .WithMany(w => w.Participacoes)
            .HasForeignKey(p => p.WorkshopId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Participacao>()
            .HasOne(p => p.Colaborador)
            .WithMany(c => c.Participacoes)
            .HasForeignKey(p => p.ColaboradorId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
