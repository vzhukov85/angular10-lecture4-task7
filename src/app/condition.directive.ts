import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[condition]',
})
export class ConditionDirective {
  private elseCondition: TemplateRef<Object> = null;
  private thenCondition: TemplateRef<Object> = null;
  private innerCondition = false;

  constructor(
    private templateRef: TemplateRef<Object>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input() set condition(condition: boolean) {
    this.innerCondition = condition;
    this.updateValue();
  }

  @Input() set conditionElse(templateRef: TemplateRef<Object>) {
    console.log('elseCondition');
    this.elseCondition = templateRef;
    this.updateValue();
  }

  @Input() set conditionThen(templateRef: TemplateRef<Object>) {
    console.log('thenCondition', templateRef);
    this.thenCondition = templateRef;
    console.log('thenCondition=', this.thenCondition);
    this.updateValue();
  }

  updateValue(): void {
    this.viewContainerRef.clear();
    if (this.innerCondition) {
      this.updateTrue();
    } else {
      this.updateFalse();
    }
  }

  updateTrue(): void {
    console.log('updateTrue');
    if (!this.thenCondition) {
      console.log('updateTrue thenCondition empty');
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      console.log('updateTrue thenCondition filled');
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.thenCondition);
    }
  }

  updateFalse(): void {
    console.log('updateFalse');
    if (!this.elseCondition) {
      console.log('updateFalse elseCondition empty');
      this.viewContainerRef.clear();
    } else {
      console.log('updateFalse elseCondition filled');
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.elseCondition);
    }
  }
}
