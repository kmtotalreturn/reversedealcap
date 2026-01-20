import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

const revenueRangeOptions = [
  "$1M - $9M",
  "$10M - $25M",
  "$25M - $50M",
  "$50M - $100M",
  "$100M - $200M",
  "$200M+",
];

const interestReasonOptions = [
  "Growth / Capex",
  "Acquisition",
  "Refinancing",
  "Ownership Liquidity",
  "Just Exploring",
];

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    industry: "",
    revenueRange: "",
    interestReasons: [] as string[],
  });

  const submitMutation = trpc.company.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        industry: "",
        revenueRange: "",
        interestReasons: [],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit form. Please try again.");
    },
  });

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interestReasons: prev.interestReasons.includes(value)
        ? prev.interestReasons.filter(v => v !== value)
        : [...prev.interestReasons, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName" className="brutalist-body font-bold">Company Name</Label>
            <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="contactName" className="brutalist-body font-bold">Contact Name</Label>
            <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="brutalist-body font-bold">Email</Label>
            <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="industry" className="brutalist-body font-bold">Industry</Label>
            <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="revenueRange" className="brutalist-body font-bold">Revenue Range</Label>
          <Select
            value={formData.revenueRange}
            onValueChange={(value) => setFormData(prev => ({ ...prev, revenueRange: value }))}
            required
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select revenue range" />
            </SelectTrigger>
            <SelectContent>
              {revenueRangeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="brutalist-body font-bold">What prompted your interest?</Label>
        <div className="space-y-3">
          {interestReasonOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={`reason-${option}`}
                checked={formData.interestReasons.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
              />
              <Label htmlFor={`reason-${option}`} className="brutalist-body cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        variant="outline"
        className="text-lg font-semibold w-full rounded-lg"
        disabled={submitMutation.isPending}
      >
        {submitMutation.isPending ? "Submitting..." : "Explore Options"}
      </Button>
    </form>
  );
}
