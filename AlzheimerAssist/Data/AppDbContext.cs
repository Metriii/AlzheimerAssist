using AlzheimerAssist.Models;
using Microsoft.EntityFrameworkCore;

namespace AlzheimerAssist.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Paciente> Pacientes { get; set; }

        public DbSet<Cuidador> Cuidadores { get; set; }

        public DbSet<Vinculo> Vinculos { get; set; }

        public DbSet<AgendaDiaria> AgendaDiaria { get; set; }

        public DbSet<AgendaAnual> AgendaAnual { get; set; }

        public DbSet<Medicacao> Medicacoes { get; set; }

        public DbSet<AtividadeMemoria> AtividadesMemoria { get; set; }

        public DbSet<Observacao> Observacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Paciente>(entity =>
            {
                entity.ToTable("pacientes");

                entity.Property(p => p.Id).HasColumnName("id");
                entity.Property(p => p.Nome).HasColumnName("nome");
                entity.Property(p => p.Email).HasColumnName("email");
                entity.Property(p => p.Senha).HasColumnName("senha");
                entity.Property(p => p.Cpf).HasColumnName("cpf");
                entity.Property(p => p.Foto).HasColumnName("foto");
            });

            modelBuilder.Entity<Cuidador>(entity =>
            {
                entity.ToTable("cuidadores");

                entity.Property(c => c.Id).HasColumnName("id");
                entity.Property(c => c.Nome).HasColumnName("nome");
                entity.Property(c => c.Email).HasColumnName("email");
                entity.Property(c => c.Senha).HasColumnName("senha");
                entity.Property(c => c.Cpf).HasColumnName("cpf");
            });

            modelBuilder.Entity<Vinculo>(entity =>
            {
                entity.ToTable("vinculos");

                entity.Property(v => v.Id).HasColumnName("id");
                entity.Property(v => v.PacienteId).HasColumnName("paciente_id");
                entity.Property(v => v.CuidadorId).HasColumnName("cuidador_id");
            });

            modelBuilder.Entity<AgendaDiaria>(entity =>
            {
                entity.ToTable("agenda_diaria");

                entity.Property(a => a.Id).HasColumnName("id");
                entity.Property(a => a.VinculoId).HasColumnName("vinculo_id");
                entity.Property(a => a.Nome).HasColumnName("nome");
                entity.Property(a => a.Feito).HasColumnName("feito");
            });

            modelBuilder.Entity<AgendaAnual>(entity =>
            {
                entity.ToTable("agenda_anual");

                entity.Property(a => a.Id).HasColumnName("id");
                entity.Property(a => a.VinculoId).HasColumnName("vinculo_id");
                entity.Property(a => a.Titulo).HasColumnName("titulo");
                entity.Property(a => a.Data).HasColumnName("data");
            });

            modelBuilder.Entity<Medicacao>(entity =>
            {
                entity.ToTable("medicacao");

                entity.Property(m => m.Id).HasColumnName("id");
                entity.Property(m => m.PacienteId).HasColumnName("paciente_id");
                entity.Property(m => m.Nome).HasColumnName("nome");
                entity.Property(m => m.Horario).HasColumnName("horario");
                entity.Property(m => m.Tomado).HasColumnName("tomado");
            });

            modelBuilder.Entity<AtividadeMemoria>(entity =>
            {
                entity.ToTable("atividade_memoria");

                entity.Property(a => a.Id).HasColumnName("id");
                entity.Property(a => a.PacienteId).HasColumnName("paciente_id");
                entity.Property(a => a.AtividadeAnimal).HasColumnName("atividade_animal");
                entity.Property(a => a.JogoMemoria).HasColumnName("jogo_memoria");
                entity.Property(a => a.QuebraCabeca).HasColumnName("quebra_cabeca");
                entity.Property(a => a.AtividadeAssociacao).HasColumnName("atividade_associacao");
                entity.Property(a => a.HorarioRealizado).HasColumnName("horario_realizado");
            });

            modelBuilder.Entity<Observacao>(entity =>
            {
                entity.ToTable("observacoes");

                entity.Property(o => o.Id).HasColumnName("id");
                entity.Property(o => o.VinculoId).HasColumnName("vinculo_id");
                entity.Property(o => o.Descricao).HasColumnName("descricao");
            });
        }
    }
}