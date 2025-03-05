import { Globe } from "@/components/ui/FeaturesSectionDemo";
// import { Button } from "@/components/ui/button"; // Suppression de l'importation inutilisée
import { BoxReveal } from "@/components/magicui/box-reveal"; 
 
export function GlobeDemo() {
  return (
    <div className="flex flex-col container">
        <div className="flex-1 flex flex-row items-center justify-around">
              <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
        Sécurité<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>
 
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
        Pratiquant en {" "}
          <span className="text-[#5046e6]">Cybersécurité</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <p>
            -&gt; Pratiquant en cybersécurité et en protection des systèmes d&apos;information. <br />
            -&gt; Compétences en analyse des vulnérabilités et en tests d&apos;intrusion. <br />
          </p>
        </div>
      </BoxReveal>
    </div>
            <div className="flex items-center">
                <Globe />
            </div>
        </div>
    </div>
  );
}



